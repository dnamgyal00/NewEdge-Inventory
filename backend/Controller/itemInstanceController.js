import prisma from "../DB/db.config.js";

//CREATE
  export const createItemInstance = async (req, res) => {
      const {item_id,stock_in_id } = req.body;
    
      const newItemInstance = await prisma.itemInstance.create({
        data: {
          item_id:item_id,
          stock_in_id:stock_in_id
        },
      });
      return res.json({ status: 200, data: newItemInstance, msg: "Item Instance Created!" });
    };
    
//READ
  export const fetchItemInstances = async (req, res) => {
    const itmes = await prisma.itemInstance.findMany({});
    return res.json({ status: 200, data: itmes });
  };
    
  export const fetchItemInstance = async (req, res) => {
    const ItemInstanceId = req.params.id;
    const ItemInstance = await prisma.itemInstance.findFirst({
      where: {
        id: Number(ItemInstanceId),
      },
    });
    return res.json({ status: 200, data: ItemInstance });
  };

//UPDATE
  export const updateItemInstance = async (req, res) => {
    const ItemInstanceId = req.params.id;
    const {status } = req.body;
  
    const ItemInstance = await prisma.itemInstance.update({
      where: {
        id: Number(ItemInstanceId),
      },
      data: {
        status:status
      },
    });
    res.json({ status: 200, data: ItemInstance, message: "Item Instance update sucessfull!" });
  };
    
//DELETE
  export const deleteItemInstance = async (req, res) => {
    const ItemInstanceId = req.params.id;
    await prisma.itemInstance.delete({
      where: {
        id: Number(ItemInstanceId),
      },
    });
  
    return res.json({ status: 200, message: "Item Instance deleted successfully" });
  };