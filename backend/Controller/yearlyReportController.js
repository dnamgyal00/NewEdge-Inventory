import prisma from "../utils/db.config.js";
import cron from 'node-cron';


//---------------1.GET REPORT
export const fetchReport = async (req, res) => {
  try {
    const page = req.query.page || 1;
    const itemsPerPage = 10;
    const skip = (page - 1) * itemsPerPage;
    const { year, category } = req.query;


    const baseQuery = {
      include: {
        item: {
          include: {
            category: true,
          },
        },
      },
      skip,
      take:itemsPerPage
    };

    const filters = {};

    if (year) {
      filters.year = Number(year);
    }

    if (category) {
      filters.item = {
        category: {
          name: category,
        },
      };
    }

     // Fetch total count of items
    const totalCount = await prisma.yearReport.count({
      where: { ...filters },
    });

    // Calculate total number of pages
    const totalPages = Math.ceil(totalCount / itemsPerPage);

    const fetchedRep = await prisma.yearReport.findMany({
      ...baseQuery,
      where: {
        ...filters,
      },
      orderBy: {
        'item': { 'name': 'asc' } ,
      },
    });

    const formattedData = fetchedRep.map((report) => ({
      id: report.id,
      year: report.year,
      opening_bal: report.opening_bal,
      closing_bal: report.closing_bal,
      stock_in_qty: report.stock_in_qty,
      stock_out_qty: report.stock_out_qty,
      created_at: report.created_at,
      itemName: report.item.name,
      categoryName: report.item.category.name,
    }));

    return res.json({ status: 200, data: formattedData, totalPages:totalPages });
  } catch (error) {
    console.error("Error fetching reports: ", error);
    return res.json({ status: 500, msg: `Internal server error. ${error}` });
  }
};

//---------------2.GET REPORT DATA: EXCEL
export const fetchReportExcelData = async (req, res) => {
  try {
    const { year, category } = req.query;
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

    if (category) {
      filters.item = {
        category: {
          name: category,
        },
      };
    }


    const fetchedRep = await prisma.yearReport.findMany({
      ...baseQuery,
      where: {
        ...filters,
      },
      orderBy: {
        'item': { 'name': 'asc' } ,
      },
    });

    const formattedData = fetchedRep.map((report) => ({
      id: report.id,
      year: report.year,
      opening_bal: report.opening_bal,
      closing_bal: report.closing_bal,
      stock_in_qty: report.stock_in_qty,
      stock_out_qty: report.stock_out_qty,
      created_at: report.created_at,
      itemName: report.item.name,
      categoryName: report.item.category.name,
    }));

    return res.json({ status: 200, data: formattedData });
  } catch (error) {
    console.error("Error fetching reports: ", error);
    return res.status(500).json({ status: 500, msg:`Internal server error. ${error}` , error});
  }
};


//---------------3.GENERATE REPORT
export const generateReport = async (req,res) =>{
    try{
      const y= req.query.year;
        await generateYearReportsForAllItems(Number(y));

        const yearRep = await prisma.yearReport.findMany({
          where:{
            year:Number(y)
          }
        })
        return res.json({ status: 200, msg: `${y} yearly report generated successfully.` , data:yearRep});
    }catch(error){
        console.error("Error generating reports: ", error);
        return res.json({ status: 500, msg: `Internal server error. ${error}` });
    }
}


//---------------4.AUTO GENERATE/UPDATE report at end of year
const generateYearlyReportForCurrentYear = async () => {
  try {
    const currentYear = new Date().getFullYear();
    await generateYearReportsForAllItems(currentYear);
    console.log(`Yearly report for ${currentYear} generated successfully.`);
  } catch (error) {
    console.error(`Error generating yearly report for current year: ${error}`);
  }
};
// Schedule cron job to run 5 minutes before midnight on December 31st
cron.schedule('55 23 31 12 *', async () => { //min, hour, date , month
  await generateYearlyReportForCurrentYear();
});


    // Helper functions
    const generateYearReport = async (itemId, year) => {
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

        // Calculate opening balance based on the closing balance of the previous year
        const previousYear = year - 1;
        const previousYearReport = await prisma.yearReport.findFirst({
          where: {
            item_id: itemId,
            year: previousYear,
          },
        });

        const openingBalance = previousYearReport ? previousYearReport.closing_bal : 0;

        // Calculate stock in and stock out quantities for the current year
        const stockInQty = calculateTransactionQty(item.stock_in, year);
        const stockOutQty = calculateTransactionQty(item.stock_out, year);

        // Calculate closing balance
        const closingBalance = openingBalance + stockInQty - stockOutQty;

        const itemReportExists = await prisma.yearReport.findFirst({
          where:{
            item_id: itemId,
            year: year,
          }
        })

        if(itemReportExists){
          console.log("REPORT IS UPDATED_________________________________________")
          await prisma.yearReport.update({
            where: {
            id:itemReportExists.id
          },
            data: {
            opening_bal: openingBalance,
            closing_bal: closingBalance,
            stock_in_qty: stockInQty,
            stock_out_qty: stockOutQty,
          },

        })

        }else{
          await prisma.yearReport.create({
            data: {
              item_id: itemId,
              year: year,
              opening_bal: openingBalance,
              closing_bal: closingBalance,
              stock_in_qty: stockInQty,
              stock_out_qty: stockOutQty,
            },

          });

        }
      } catch (error) {
        console.error("Error generating YearReport:", error);
      }
    };
    const calculateTransactionQty = (transactions, year) => {
      return transactions.reduce((total, transaction) => {
        if (transaction.created_at.getFullYear() === year) {
          return total + transaction.qty;
        }
        return total;
      }, 0);
    };
    const generateYearReportsForAllItems = async (year) => {
      try {
        const allItems = await prisma.item.findMany();

        for (const item of allItems) {
          await generateYearReport(item.id, year);
        }
      } catch (error) {
        console.error("Error generating YearReports for all items:", error);
      }
    };


  export const getUniqueYears = async (req,res) => {
    try {
      const uniqueYears = await prisma.yearReport.findMany({
        distinct: ['year'],
        select: {
          year: true,
        },
      });
      const data=uniqueYears.map(item => item.year)
      return res.json({status:200, data:data});

    } catch (error) {
      console.error("Error fetching unique years from YearReport: ", error);
      return res.status.json({ status: 500, msg: 'Error fetching unique years from YearReport: ' + error.message });
    }
  }
