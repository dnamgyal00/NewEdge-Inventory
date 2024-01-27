import { json } from "express";
import prisma from "../utils/db.config.js";


//---------------Get Report
// export const fetchReport = async (req,res) =>{
//   try{
//     const year = req.query.year;
//     const category= req.query.category;

//     const filters ={};
//     if(year){

//     }

//     if(category){

//     }
//     const fetchedRep = await prisma.yearReport.findMany({
//       where:{
//         year:Number(year)
//       },
//       include:{
//         item:{
//           include:{
//             category:true
//           }
//         }
//       }
//     });

//     // Extract relevant data from the response
// const formattedData = fetchedRep.map((report) => ({
//   id: report.id,
//   year: report.year,
//   opening_bal: report.opening_bal,
//   closing_bal: report.closing_bal,
//   stock_in_qty: report.stock_in_qty,
//   stock_out_qty: report.stock_out_qty,
//   created_at: report.created_at,
//   itemName: report.item.name,
//   categoryName: report.item.category.name,
// }));

//     return res.json({ status: 200, data: formattedData });


//   }catch(error){
//     console.error("Error fetching reportS: ", error);
//     return res.status(500).json({ status: 500, msg: "Internal server error" });
//   }
// }
export const fetchReport = async (req, res) => {
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
      orderBy: {
        created_at: "desc",
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
    return res.status(500).json({ status: 500, msg: "Internal server error" });
  }
};




//---------------Generate Report
export const generateReport = async (req,res) =>{
    try{
        //triger function
        const currentYear = new Date().getFullYear();
        await generateYearReportsForAllItems(currentYear);

        const yearRep = await prisma.yearReport.findMany({

        })
        return res.json({ status: 200, msg: "Yearly report generated successfully." , data:yearRep});
    }catch(error){
        console.error("Error generating reports: ", error);
        return res.status(500).json({ status: 500, msg: "Internal server error" });
    }
}

// Function to generate YearReport for a specific item and year
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
  
      // Create or update the YearReport record
      await prisma.yearReport.create({
        // where: {
        //   item_id: itemId,
        //   year: year,
        // },
        data: {
          item_id: itemId,
          year: year,
          opening_bal: openingBalance,
          closing_bal: closingBalance,
          stock_in_qty: stockInQty,
          stock_out_qty: stockOutQty,
        },
        // update: {
        //   opening_bal: openingBalance,
        //   closing_bal: closingBalance,
        //   stock_in_qty: stockInQty,
        //   stock_out_qty: stockOutQty,
        // },
      });
    } catch (error) {
      console.error("Error generating YearReport:", error);
    }
  };
  // Helper function to calculate total quantity for a specific year in transactions
  const calculateTransactionQty = (transactions, year) => {
    return transactions.reduce((total, transaction) => {
      if (transaction.created_at.getFullYear() === year) {
        return total + transaction.qty;
      }
      return total;
    }, 0);
  };
  // Function to generate YearReports for all items
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
