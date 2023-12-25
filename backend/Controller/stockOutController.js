import prisma from "../DB/db.config.js";

// CREATE
export const createStockOut = async (req, res) => {
  const { item_id, qty, type } = req.body;

  // Fetch the current qty_on_hand
  const currentItem = await prisma.item.findUnique({
    where: {
      id: Number(item_id),
    },
  });

  // Validate if qty is less than or equal to qty_on_hand
  if (!currentItem || Number(qty) > currentItem.qty_on_hand) {
    return res.status(400).json({
      status: 400,
      msg: `Invalid stock-out quantity. It exceeds the available quantity on hand: ${currentItem.qty_on_hand}.`,
    });
  }

  // Decrement qty_on_hand in Items
  await prisma.item.update({
    where: {
      id: Number(item_id),
    },
    data: {
      qty_on_hand: {
        decrement: Number(qty),
      },
    },
  });

  // Create a new stock-out record
  const newStockOut = await prisma.stockOut.create({
    data: {
      item_id: Number(item_id),
      qty: Number(qty),
      type,
    },
  });

  // Fetch existing item instances associated with the item
  const existingItemInstances = await prisma.itemInstance.findMany({
    where: {
      item_id: Number(item_id),
      status: "inStock", // You may need to adjust this condition based on your data model
    },
    take: Number(qty), // Fetch only the required number of instances
  });

  // Update the status of existing item instances on stock out
  const itemInstances = [];
  for (const itemInstance of existingItemInstances) {
    const updatedItemInstance = await prisma.itemInstance.update({
      where: {
        id: itemInstance.id,
      },
      data: {
        status: "outOfStock",
        stock_out_id: newStockOut.id,
      },
    });
    itemInstances.push(updatedItemInstance);
  }

  return res.json({
    status: 200,
    data: { stockOut: newStockOut, itemInstances },
    msg: "Item stocked out successfully!!",
  });
};










//READ
export const fetchStockOuts = async (req, res) => {
  const stockOuts = await prisma.stockOut.findMany({ });
  return res.json({ status: 200, data: stockOuts });
};

export const fetchStockOut = async (req, res) => {
  const StockOutId = req.params.id;
  const StockOut = await prisma.stockOut.findFirst({
    where: {
      id: StockOutId,
    },
  });
  return res.json({ status: 200, data: StockOut });
};



//UPDATE *NOT YET DONE
export const updateStockOut = async (req, res) => {
  const StockOutId = req.params.id;
  const { name, description } = req.body;

  const StockOut = await prisma.stockOut.update({
    where: {
      id: Number(StockOutId),
    },
    data: {
      name: name,
      description: description,
    },
  });
  res.json({
    status: 200,
    data: StockOut,
    message: "StockOut update sucessfull!",
  });
};

//DELTE *NOT YET DONE
export const deleteStockOut = async (req, res) => {
  const StockOutId = req.params.id;
  await prisma.stockOut.delete({
    where: {
      id: Number(StockOutId),
    },
  });
  return res.json({ status: 200, message: "StockOut deleted successfully" });
};
