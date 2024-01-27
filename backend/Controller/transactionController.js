// Assuming you're using Node.js and Express for your backend
import prisma from "../utils/db.config.js";

// GET combined StockIn and StockOut data : 
export const getTransaction = async (req, res) => {
  try {
    const { startDate, endDate, category, item, transactionType } = req.query;
    const page = req.query.page || 1;
    console.log(page)
    const itemsPerPage = 5;
    const skip = (page - 1) * itemsPerPage;

    // Define a base query object for both StockIn and StockOut
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

    // Define filters based on the provided query parameters
    const filters = {};
    
    if (startDate && endDate) {
      filters.created_at = {
        gte: new Date(startDate),
        lte: new Date(endDate),
      };
    }

    if (category) {
      filters.item = {
        category: {
          name: category,
        },
      };
    }

    if (item) {
      filters.item = {
        name: item,
      };
    }

    if (transactionType) {
      const isStockIn = transactionType.toLowerCase() === "stockin";
      filters.type = isStockIn ? "Purchased" : "Sales";
    }

      // Fetch StockIn data with applied filters and pagination
      const stockInData = await prisma.stockIn.findMany({
        ...baseQuery,
        where: {
          ...filters,
        },
        skip,
        take: itemsPerPage,
      });
  
      // Fetch StockOut data with applied filters and pagination
      const stockOutData = await prisma.stockOut.findMany({
        ...baseQuery,
        where: {
          ...filters,
        },
        skip,
        take: itemsPerPage,
      });


    // Add transaction_type field to StockIn and StockOut data
    const stockInDataWithTransactionType = stockInData.map((entry) => ({
      ...entry,
      transaction_type: "in",
    }));

    const stockOutDataWithTransactionType = stockOutData.map((entry) => ({
      ...entry,
      transaction_type: "out",
    }));

    // Combine StockIn and StockOut data
    const combinedData = [...stockInDataWithTransactionType, ...stockOutDataWithTransactionType];

    // Order the combined data by created_at timestamp in descending order (latest first)
    combinedData.sort((a, b) => new Date(b.created_at) - new Date(a.created_at));

    return res.json({ status: 200, data: combinedData });
  } catch (error) {
    console.error("Error fetching combined stock data:", error);
    return res.status(500).json({ status: 500, msg: "Internal server error" });
  }
};

export const getTransactionExcelData = async (req, res) => {
  try {
    const { startDate, endDate, category, item, transactionType } = req.query;
    // Define a base query object for both StockIn and StockOut
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

    // Define filters based on the provided query parameters
    const filters = {};
    
    if (startDate && endDate) {
      filters.created_at = {
        gte: new Date(startDate),
        lte: new Date(endDate),
      };
    }

    if (category) {
      filters.item = {
        category: {
          name: category,
        },
      };
    }

    if (item) {
      filters.item = {
        name: item,
      };
    }

    if (transactionType) {
      const isStockIn = transactionType.toLowerCase() === "stockin";
      filters.type = isStockIn ? "Purchased" : "Sales";
    }

      // Fetch StockIn data with applied filters and pagination
      const stockInData = await prisma.stockIn.findMany({
        ...baseQuery,
        where: {
          ...filters,
        },
   
      });
  
      // Fetch StockOut data with applied filters and pagination
      const stockOutData = await prisma.stockOut.findMany({
        ...baseQuery,
        where: {
          ...filters,
        },

      });


    // Add transaction_type field to StockIn and StockOut data
    const stockInDataWithTransactionType = stockInData.map((entry) => ({
      ...entry,
      transaction_type: "in",
    }));

    const stockOutDataWithTransactionType = stockOutData.map((entry) => ({
      ...entry,
      transaction_type: "out",
    }));

    // Combine StockIn and StockOut data
    const combinedData = [...stockInDataWithTransactionType, ...stockOutDataWithTransactionType];

    // Order the combined data by created_at timestamp in descending order (latest first)
    combinedData.sort((a, b) => new Date(b.created_at) - new Date(a.created_at));

    return res.json({ status: 200, data: combinedData });
  } catch (error) {
    console.error("Error fetching combined stock data:", error);
    return res.status(500).json({ status: 500, msg: "Internal server error" });
  }
};