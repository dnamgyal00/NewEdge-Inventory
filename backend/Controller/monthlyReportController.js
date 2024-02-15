import prisma from "../utils/db.config.js";
import cron from 'node-cron';


//---------------1.GET REPORT 
export const fetchReports = async (req, res) => {
    try {
      console.log("Hello from monthly")
      const page = req.query.page || 1;
      const itemsPerPage = 10;
      const skip = (page - 1) * itemsPerPage;
      const { year, month, category } = req.query; // Add month filter
  
      const baseQuery = {
        include: {
          item: {
            include: {
              category: true,
            },
          },
        },
        skip,
        take: itemsPerPage,
      };
  
      const filters = {};
  
      if (year) {
        filters.year = Number(year);
      }
  
      if (month) {
        filters.month = Number(month); // Apply month filter
      }
  
      if (category) {
        filters.item = {
          category: {
            name: category,
          },
        };
      }
  
      // Fetch total count of items
      const totalCount = await prisma.monthReport.count({
        where: { ...filters },
      });
  
      // Calculate total number of pages
      const totalPages = Math.ceil(totalCount / itemsPerPage);
  
      const fetchedRep = await prisma.monthReport.findMany({
        ...baseQuery,
        where: {
          ...filters,
        },
        orderBy: {
          item: { name: 'asc' },
        },
      });
  
      const formattedData = fetchedRep.map((report) => ({
        id: report.id,
        year: report.year,
        month: report.month, // Include month in formatted data
        opening_bal: report.opening_bal,
        closing_bal: report.closing_bal,
        stock_in_qty: report.stock_in_qty,
        stock_out_qty: report.stock_out_qty,
        created_at: report.created_at,
        itemName: report.item.name,
        categoryName: report.item.category.name,
      }));
  
      return res.json({ status: 200, data: formattedData, totalPages });
    } catch (error) {
      console.error("Error fetching reports: ", error);
      return res.json({ status: 500, msg: `Internal server error. ${error}` });
    }
};

//---------------2.GET REPORT 
export const fetchReportsExcelData = async (req, res) => {
    try {
      const { year, month, category } = req.query; 
      const baseQuery = {
        include: {
          item: {
            include: {
              category: true,
            },
          },
        },
      };
  
      const filters = {};
  
      if (year) {
        filters.year = Number(year);
      }
  
      if (month) {
        filters.month = Number(month); // Apply month filter
      }
  
      if (category) {
        filters.item = {
          category: {
            name: category,
          },
        };
      }
    
      const fetchedRep = await prisma.monthReport.findMany({
        ...baseQuery,
        where: {
          ...filters,
        },
        orderBy: {
          item: { name: 'asc' },
        },
      });
  
      const formattedData = fetchedRep.map((report) => ({
        id: report.id,
        year: report.year,
        month: report.month, // Include month in formatted data
        opening_bal: report.opening_bal,
        closing_bal: report.closing_bal,
        stock_in_qty: report.stock_in_qty,
        stock_out_qty: report.stock_out_qty,
        created_at: report.created_at,
        itemName: report.item.name,
        categoryName: report.item.category.name,
      }));
  
      return res.json({ status: 200, data: formattedData, });
    } catch (error) {
      console.error("Error fetching monthly reports excel data: ", error);
      return res.json({ status: 500, msg: `Internal server error. ${error}` });
    }
};
  


//---------------3.GENERATE REPORT (month should be 1-12)
export const generateReport = async (req, res) => {
    try {
        const year = req.query.year;
        const month = req.query.month;
        await generateMonthReportsForAllItems(Number(year), Number(month));

        // const monthRep = await prisma.monthReport.findMany({
        //     where: {
        //         AND: [{ year: Number(year) }, { month: Number(month) }]
        //     }
        // });
        return res.json({ status: 200, msg: `${year}/${month} monthly report generated successfully.`});
    } catch (error) {
        console.error("Error generating reports: ", error);
        return res.json({ status: 500, msg: `Internal server error. ${error}` });
    }
};

  
        // Helper functions
        const generateMonthReportsForAllItems = async (year, month) => {
            try {
                const allItems = await prisma.item.findMany();

                for (const item of allItems) {
                    await generateMonthReport(item.id, year, month);
                }
            } catch (error) {
                console.error("Error generating MonthReports for all items:", error);
            }
        };

        const generateMonthReport = async (itemId, year, month) => {
            try {
                const item = await prisma.item.findUnique({
                    where: {
                        id: itemId,
                    },
                    include: {
                        stock_in: true,
                        stock_out: true,
                    },
                });

                if (!item) {
                    console.error(`Item with ID ${itemId} not found.`);
                    return;
                }

                // Calculate opening balance based on the closing balance of the previous month (1-12 month)
                const previousMonth = month === 1 ? 12 : month - 1;
                const previousYear = previousMonth === 12 ? year - 1 : year;
                const previousMonthReport = await prisma.monthReport.findFirst({
                    where: {
                        item_id: itemId,
                        year: previousYear,
                        month: previousMonth
                    },
                });

                const openingBalance = previousMonthReport ? previousMonthReport.closing_bal : 0;

                // Calculate stock in and stock out quantities for the current month
                const stockInQty = calculateTransactionQty(item.stock_in, year, month);
                const stockOutQty = calculateTransactionQty(item.stock_out, year, month);

                // Calculate closing balance
                const closingBalance = openingBalance + stockInQty - stockOutQty;

                const itemReportExists = await prisma.monthReport.findFirst({
                    where: {
                        item_id: itemId,
                        year: year,
                        month: month
                    }
                });

                if (itemReportExists) {
                    console.log("REPORT IS UPDATED_________________________________________")
                    await prisma.monthReport.update({
                        where: {
                            id: itemReportExists.id
                        },
                        data: {
                            opening_bal: openingBalance,
                            closing_bal: closingBalance,
                            stock_in_qty: stockInQty,
                            stock_out_qty: stockOutQty,
                        },

                    });

                } else {
                    await prisma.monthReport.create({
                        data: {
                            item_id: itemId,
                            year: year,
                            month: month,
                            opening_bal: openingBalance,
                            closing_bal: closingBalance,
                            stock_in_qty: stockInQty,
                            stock_out_qty: stockOutQty,
                        },

                    });

                }
            } catch (error) {
                console.error("Error generating MonthReport:", error);
            }
        };

        const calculateTransactionQty = (transactions, year, month) => {
            return transactions.reduce((total, transaction) => {
                if (transaction.created_at.getFullYear() === year && transaction.created_at.getMonth() + 1 === month) {
                    return total + transaction.qty;
                }
                return total;
            }, 0);
        };


//---------------4.AUTO GENERATE/UPDATE report at end of month
const generateMonthlyReportForCurrentMonth = async () => {
    try {
        const today = new Date();
        const currentYear = today.getFullYear();
        const currentMonth = today.getMonth() + 1; // Note: Month is zero-based index in JavaScript, so add 1
        await generateMonthReportsForAllItems(currentYear, currentMonth);
        console.log(`Monthly report for ${currentYear}/${currentMonth} generated successfully.`);
    } catch (error) {
        console.error(`Error generating monthly report for current month: ${error}`);
    }
};

// Schedule cron job to run 5 minutes before midnight on the last day of each month
cron.schedule('55 23 28-31 * *', async () => { //min, hour, date, month
    await generateMonthlyReportForCurrentMonth();
});

  export const getUniqueYears = async (req,res) => {
    try {
      const uniqueYears = await prisma.monthReport.findMany({
        distinct: ['year'],
        select: {
          year: true,
        },
      });
      const data=uniqueYears.map(item => item.year)
      return res.json({status:200, data:data});

    } catch (error) {
      console.error("Error fetching unique years from MonthReport: ", error);
      return res.status.json({ status: 500, msg: 'Error fetching unique years from MonthReport: ' + error.message });
    }
  }

  export const getUniqueMonths = async (req,res) => {
    try {
        const year = req.query.year;

      const uniqueYears = await prisma.monthReport.findMany({
        where:{
            year:Number(year)
        },
        distinct: ['month'],
        select: {
          month: true,
        },
      });
      const data=uniqueYears.map(item => item.month)
      return res.json({status:200, data:data});

    } catch (error) {
      console.error("Error fetching unique month from MonthReport: ", error);
      return res.status.json({ status: 500, msg: 'Error fetching unique month from MonthReport: ' + error.message });
    }
  }
  

