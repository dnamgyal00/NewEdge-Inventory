import prisma from "../utils/db.config.js";

//CREATE
  export const createItemInstance = async (req, res) => {
      try{
        const {item_id,stock_in_id } = req.body;
    
      const newItemInstance = await prisma.itemInstance.create({
        data: {
          item_id:item_id,
          stock_in_id:stock_in_id
        },
      });
      return res.json({ status: 200, data: newItemInstance, msg: "Item Instance Created!" });
      }catch(error){
        console.error("Error: ", error);
        return res.status(500).json({ status: 500, msg: error });
      }
    };
    
//READ
  export const fetchItemInstances = async (req, res) => {
    try{
      const itmes = await prisma.itemInstance.findMany({});
    return res.json({ status: 200, data: itmes });
    }catch(error){
      console.error("Error: ", error);
      return res.status(500).json({ status: 500, msg: error });
    }
  };
    
  export const fetchItemInstance = async (req, res) => {
    try{
      const ItemInstanceId = req.params.id;
    const ItemInstance = await prisma.itemInstance.findFirst({
      where: {
        id: Number(ItemInstanceId),
      },
    });
    return res.json({ status: 200, data: ItemInstance });
    }catch(error){
      console.error("Error: ", error);
      return res.status(500).json({ status: 500, msg: error });
    }
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