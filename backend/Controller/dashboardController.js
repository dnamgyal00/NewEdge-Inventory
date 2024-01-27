import prisma from "../utils/db.config.js";
import { startOfDay, subWeeks, subMonths, eachWeekOfInterval, eachMonthOfInterval, eachDayOfInterval, format, startOfYear } from 'date-fns';

//---CARD 1
//--GET transaction  :- /api/dashboard/transaction/?timeRange=day / month / year
export const getTotalTransaction = async (req, res) => {
    try {
      const { timeRange } = req.query;
  
      let startDate;
      switch (timeRange) {
        case 'day':
          startDate = startOfDay(new Date());
          break;
        case 'week':
          startDate = subWeeks(new Date(), 1);
          break;
        case 'month':
          startDate = subMonths(new Date(), 1);
          break;
        default:
          return res.status(400).json({ status: 400, msg: "Invalid time range. Supported values: day, week, month." });
      }
  
      const totalStockIn = await prisma.stockIn.count({
        where: {
          created_at: {
            gte: startDate,
          },
        },
      });
  
      const totalStockOut = await prisma.stockOut.count({
        where: {
          created_at: {
            gte: startDate,
          },
        },
      });
  
      return res.json({ status: 200, data: { stockIn: totalStockIn, stockOut: totalStockOut } });
    } catch (error) {
      console.error("Error fetching total stock for the specified time range:", error);
      return res.status(500).json({ status: 500, msg: "Internal server error" });
    }
  };


//---CARD 2
export const getTotalCategoriesAndItems = async (req, res) => { 
  try {
    // Fetch total categories
    const totalCategories = await prisma.category.count();

    // Fetch total items
    const totalItems = await prisma.item.count();

    // Fetch recent 5 items added
    const recentItems = await prisma.item.findMany({
      take: 3,
      orderBy: { created_at: 'desc' }, // Assuming you have a 'created_at' field in the Item model
    });

    return res.json({
      status: 200,
      data: { totalCategories, totalItems, recentItems },
    });
  } catch (error) {
    console.error("Error fetching total categories, items, and recent items:", error);
    return res.status(500).json({ status: 500, msg: "Internal server error" });
  }
};



//---CARD 3
// GET stock data for line graph
export const getGraphData = async (req, res) => {
  try {
    const { timeInterval } = req.query;

    let startDate = subMonths(startOfYear(Date()),2);
    console.log(startDate);
    let interval;
    switch (timeInterval) {
      case "day":
      interval = eachDayOfInterval({start:startDate, end:Date()});
      break;
    
    case "week":
      interval = eachWeekOfInterval({start:startDate, end:Date()})
      break;

    case "month":
      interval = eachMonthOfInterval({start:startDate, end:Date()})
      break;

    default:
      return res.status(400).json({ status: 400, msg: "Invalid time interval. Supported values: day, week, month." });
    }

    // Fetch StockIn data for the specified interval
    const stockInData = await prisma.stockIn.findMany({
      where: {
        created_at: {
          gte: startDate,
        },
      },
    });

    // Fetch StockOut data for the specified interval
    const stockOutData = await prisma.stockOut.findMany({
      where: {
        created_at: {
          gte: startDate,
        },
      },
    });

    // Group StockIn and StockOut data by date
    const stockInCounts = groupDataByDate(stockInData, interval);
    const stockOutCounts = groupDataByDate(stockOutData, interval);

    // Combine StockIn and StockOut counts
    const combinedData = combineStockData(stockInCounts, stockOutCounts, interval);

    return res.json({ status: 200, data: combinedData });
    
  } catch (error) {
    console.error("Error fetching stock data for line graph:", error);
    return res.status(500).json({ status: 500, msg: "Internal server error" });
  }
};

// Helper function to group data by date
const groupDataByDate = (data, interval) => {
  const groupedData = {};
  interval.forEach(date => {
    const dateString = format(date, 'yyyy-MM-dd');
    groupedData[dateString] = 0; // Initialize count to 0 for each date
  });

  data.forEach(entry => {
    const entryDate = format(entry.created_at, 'yyyy-MM-dd');
    groupedData[entryDate] += 1; // Increment count for each entry on its corresponding date
  });

  return groupedData;
};

// Helper function to combine StockIn and StockOut counts
const combineStockData = (stockInCounts, stockOutCounts, interval) => {
  return interval.map(date => ({
    date: format(date, 'yyyy-MM-dd'),
    stockIn: stockInCounts[format(date, 'yyyy-MM-dd')] || 0,
    stockOut: stockOutCounts[format(date, 'yyyy-MM-dd')] || 0,
  }));
};


//---CARD 4
// GET top 6 recent StockIn and StockOut transactions
export const getTopRecentTransactions = async (req, res) => {
  try {
    // Fetch the top 3 recent StockIn transactions
    const top5StockIn = await prisma.stockIn.findMany({
      take: 3, 
      include: {
        item:{
            include:{
                category:true
            }
        }
      },
      orderBy: {
        created_at: "desc", // Order by created_at timestamp in descending order (latest first)
      },
    });

    // Add transaction_type field to StockIn data
    const top5StockInWithTransactionType = top5StockIn.map((entry) => ({
      ...entry,
      transaction_type: "in",
    }));

    // Fetch the top 3 recent StockOut transactions
    const top5StockOut = await prisma.stockOut.findMany({
      take: 3, 
      include: {
        item:{
            include:{
                category:true
            }
        }
      },
      orderBy: {
        created_at: "desc", // Order by created_at timestamp in descending order (latest first)
      },
    });

    // Add transaction_type field to StockOut data
    const top5StockOutWithTransactionType = top5StockOut.map((entry) => ({
      ...entry,
      transaction_type: "out",
    }));

    // Combine the top 3 StockIn and StockOut transactions
    const combinedTop5Data = [...top5StockInWithTransactionType, ...top5StockOutWithTransactionType];

    // Order the combined data by created_at timestamp in descending order (latest first)
    combinedTop5Data.sort((a, b) => new Date(b.created_at) - new Date(a.created_at));

    return res.json({ status: 200, data: combinedTop5Data });
  } catch (error) {
    console.error("Error fetching top 5 recent stock transactions:", error);
    return res.status(500).json({ status: 500, msg: "Internal server error" });
  }
};


