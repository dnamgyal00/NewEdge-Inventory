import prisma from "../DB/db.config.js";

//CREATE
export const createStockIn = async (req, res) => {
  const { item_id, qty } = req.body;

  //* increment qty_on_hand in Items
  await prisma.item.update({
    where:{
        id:Number(item_id)
    },
    data:{
        qty_on_hand:{
            increment:Number(qty)
        }
    }
  });

  const newStockIn = await prisma.stockIn.create({
    data: {
      item_id:Number(item_id),
      qty:Number(qty)
    },
  });

  // Create item instances based on the received quantity
  const itemInstances = [];
  for (let i = 0; i < Number(qty); i++) {
    const newItemInstance = await prisma.itemInstance.create({
      data: {
        item_id: Number(item_id),
        stock_in_id: newStockIn.id,
      },
    });
    itemInstances.push(newItemInstance);
  }

  return res.json({
    status: 200,
    data: { stockIn: newStockIn, itemInstances },
    msg: "Item stocked in successfully!!",
  });

};

//READ
export const fetchStockIns = async (req, res) => {
  const stockIns = await prisma.stockIn.findMany({ });
  return res.json({ status: 200, data: stockIns });
};

export const fetchStockIn = async (req, res) => {
  const StockInId = req.params.id;
  const StockIn = await prisma.stockIn.findFirst({
    where: {
      id: StockInId,
    },
  });
  return res.json({ status: 200, data: StockIn });
};



//UPDATE *NOT YET DONE
export const updateStockIn = async (req, res) => {
  const StockInId = req.params.id;
  const { name, description } = req.body;

  const StockIn = await prisma.stockIn.update({
    where: {
      id: Number(StockInId),
    },
    data: {
      name: name,
      description: description,
    },
  });
  res.json({
    status: 200,
    data: StockIn,
    message: "StockIn update sucessfull!",
  });
};

//DELTE *NOT YET DONE
export const deleteStockIn = async (req, res) => {
  const StockInId = req.params.id;
  await prisma.stockIn.delete({
    where: {
      id: Number(StockInId),
    },
  });
  return res.json({ status: 200, message: "StockIn deleted successfully" });
};
