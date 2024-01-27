import prisma from "../utils/db.config.js";

//CREATE
export const createStockIn = async (req, res) => {
  try{
    const { item_id, qty, total_price ,created_at} = req.body;

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
      qty:Number(qty),
      total_price:Number(total_price),
      created_at: new Date(created_at),
    },
  });

  // Create item instances based on the received quantity
  const itemInstances = [];
  for (let i = 0; i < Number(qty); i++) {
    const newItemInstance = await prisma.itemInstance.create({
      data: {
        item_id: Number(item_id),
        stock_in_id: newStockIn.id,
        status_details:"Item is purchased and in stock"
      },
    });
    itemInstances.push(newItemInstance);
  }

  return res.json({
    status: 200,
    data: { stockIn: newStockIn, itemInstances },
    msg: "Item stocked in successfully!!",
  });

  }catch(error){
    console.error("Error: ", error);
    return res.status(500).json({ status: 500, msg: error });
  }
};

//READ
export const fetchStockIns = async (req, res) => {
  try{
    const stockIns = await prisma.stockIn.findMany({
      include:{
       item:{
        include:{
          category:true
        }
       }
      }
    });
    return res.json({ status: 200, data: stockIns });
  }catch(error){
    console.error("Error: ", error);
    return res.status(500).json({ status: 500, msg: error });
  }
};
export const fetchStockIn = async (req, res) => {
  try{
    const StockInId = req.params.id;
  const StockIn = await prisma.stockIn.findFirst({
    where: {
      id: StockInId,
    },
    include:{
      ItemInstance_ids:true,
      item:{
        include:{
          category:true
        }
       }
    }
  });
  return res.json({ status: 200, data: StockIn });
  }catch(error){
    console.error("Error: ", error);
    return res.status(500).json({ status: 500, msg: error });
  }
};





//UPDATE *NOT YET DONE
export const updateStockIn = async (req, res) => {
  const StockInId = req.params.id;
  const { item_id,new_qty} = req.body;

  const currentStockIn = await prisma.stockIn.findFirst({
    where:{
      id:StockInId
    }
  })

  //update if only qty is changed
  if(currentStockIn.item_id==item_id){

    //* update qty_in_hand in Items table
    const old_qty = currentStockIn.qty
    let change_qty
  
    if(old_qty>Number(new_qty)){ //qty decrement
      change_qty = old_qty-Number(new_qty)

      await prisma.item.update({
        where:{
            id:Number(item_id)
        },
        data:{
            qty_on_hand:{
                decrement:change_qty
            }
        }
      });
    }else{ //qty increment
      change_qty = Number(new_qty)-old_qty

      await prisma.item.update({
        where:{
            id:Number(item_id)
        },
        data:{
            qty_on_hand:{
                increment:change_qty
            }
        }
      });
    }

    

    const StockIn = await prisma.stockIn.update({
      where: {
        id: StockInId,
      },
      data: {
        qty:Number(new_qty)
      },
    });

    res.json({
      status: 200,
      data: StockIn,
      message: "StockIn update sucessfull!",
    });

  }else{

  }
};

//DELTE *NOT YET DONE
export const deleteStockIn = async (req, res) => {
  const StockInId = req.params.id;
  await prisma.stockIn.delete({
    where: {
      id: StockInId
    },
  });
  return res.json({ status: 200, message: "StockIn deleted successfully" });
};




