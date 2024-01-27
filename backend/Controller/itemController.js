import prisma from "../utils/db.config.js";
import fs from 'fs';
import { Client } from "minio";
const minioClient = new Client({
    endPoint: '192.168.131.225',
    port: 9000, 
    useSSL: false, 
    accessKey: 'T7Lkgx2o2VhJ4ImC4Fx3',
    secretKey: '0SrFBOLulHLbPYVV6pcHpx1Zxh4LvG4GdIdt6tVd',
});


//CREATE
export const createItem = async (req, res) => {
  try{
    const { category_id, name, unit, description, brand,unit_price } = req.body;
    const file = req.file;
    console.log(req)
    
if(!req.file){
  res.send({
    status:false,
    message:"No file uploaded"
  })
}else{ //upload image to Minio
  minioClient.fPutObject('inventory', file.originalname, `public/item/${file.originalname}`,  (err, etag) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ error: 'File upload failed.' });
    }else{
       // Delete the local file after successful Minio upload
  fs.unlink(`public/item/${file.originalname}`, (err) => {
    if (err) {
      console.error(err);
    } else {
      console.log('Local file deleted successfully.');
    }
  });
    }
  });

  const url = await minioClient.presignedGetObject('inventory', file.originalname);
  console.log(`Pre-signed URL: ${url}`);

  //* increment item counter in category
  await prisma.category.update({
    where: {
      id: Number(category_id),
    },
    data: {
      item_count: {
        increment: 1,
      },
    },
  });

  const newItem = await prisma.item.create({
    data: {
      category_id: Number(category_id),
      name: name,
      unit: unit,
      brand: brand,
      unit_price:Number(unit_price),
      description: description,
      image: url, // Set the image path
    },
  });

  return res.json({ status: 200, data: newItem, msg: "Item Created!" });}

  }catch(error){
    console.error(error);
    return res.status(500).json({ status: 500, msg: "Internal server error" });
  }
};

// export const createItem= async (req, res) => {
//   try{
//     const { category_id, name, unit, description, brand,unit_price } = req.body;

//     //console.log(req);
//     console.log(req);

//     return res.json({ status: 200, data: req.body, msg: "Item Reached!" });



//   // //* increment item counter in category
//   // await prisma.category.update({
//   //   where: {
//   //     id: Number(category_id),
//   //   },
//   //   data: {
//   //     item_count: {
//   //       increment: 1,
//   //     },
//   //   },
//   // });

//   // const newItem = await prisma.item.create({
//   //   data: {
//   //     category_id: Number(category_id),
//   //     name: name,
//   //     unit: unit,
//   //     brand: brand,
//   //     unit_price:Number(unit_price),
//   //     description: description,
//   //   },
//   // });
//   // return res.json({ status: 200, data: newItem, msg: "Item Created!" });

//   }catch(error){
//     console.error(error);
//     return res.status(500).json({ status: 500, msg: "Internal server error" });
//   }
// };


//READ
export const fetchItems = async (req, res) => {
  try{
  const page = req.query.page || 1;
  const pageSize = 10;
  const skip = (page - 1) * pageSize;

  const { categoryName, brandName } = req.query;

  // Define a base query object for item retrieval
  const baseQuery = {
    orderBy: {
      name: "asc",
    },
    include: {
      category: true,
    },
  };

  // Define filters based on the provided query parameters
  const filters = {};

  if (categoryName) {
    filters.category = {
      name: categoryName,
    };
  }

  if (brandName) {
    filters.brand = brandName;
  }

  // Fetch items with applied filters and pagination
  if(req.query.page>=1){
    const items = await prisma.item.findMany({
      ...baseQuery,
      where: {
        ...filters,
      },
      skip,
      take: pageSize,
    });
  
    return res.json({ status: 200, data: items });
  }

  //No pagenation
  const items = await prisma.item.findMany({
    ...baseQuery,
    where: {
      ...filters,
    },
  });
  return res.json({ status: 200, data: items });

  }catch(error){
    return res.json({ status: 404, msg: error });
  }
};

export const fetchItem = async (req, res) => {
  try {
    const itemId = req.params.id;
    const page = req.query.page || 1;
    const itemsPerPage = 10;
    const skip = (page - 1) * itemsPerPage;

    const item = await prisma.item.findFirst({
      where: {
        id: Number(itemId),
      },
      include: {
        category: true,
        item_instance: {
          orderBy: {
            id: "asc",
          },
          skip,
          take: itemsPerPage,
        },
        stock_in:{
          skip,
          take: itemsPerPage,
        },
        stock_out:{
          skip,
          take: itemsPerPage,
        }
      },
    });


    // Add transaction_type field to StockIn and StockOut data
    const stockInDataWithTransactionType = item.stock_in.map((entry) => ({
      ...entry,
      transaction_type: "in",
    }));

    const stockOutDataWithTransactionType = item.stock_out.map((entry) => ({
      ...entry,
      transaction_type: "out",
    }));

    // Combine StockIn and StockOut data
    const combinedData = [...stockInDataWithTransactionType, ...stockOutDataWithTransactionType];
    // Order the combined data by created_at timestamp in descending order (latest first)
    combinedData.sort((a, b) => new Date(b.created_at) - new Date(a.created_at));
    const formatData = {
      id: item.id,
      category_id:item.category_id,
      name:item.name,
      brand:item.brand,
      unit:item.unit,
      unit_price:item.unit_price,
      description:item.description,
      qty_on_hand:item.qty_on_hand,
      image:item.image,
      created_at: item.created_at,
      category:item.category,
      transactions:combinedData,
      item_instance:item.item_instance
    }
    
    return res.json({ status: 200, data: formatData });
  } catch (error) {
    console.error("Error: ", error);
    return res.status(500).json({ status: 500, msg: error });
  }
};



//UPDATE
export const updateItem = async (req, res) => {
  const ItemId = req.params.id;
  const { name, unit,brand,unit_price, description,category_id } = req.body;

  const Item = await prisma.item.update({
    where: {
      id: Number(ItemId),
    },
    data: {
        category_id:category_id,
        name: name,
        unit: unit,
        brand: brand,
        unit_price:Number(unit_price),
        description: description,
    },
  });
  res.json({ status: 200, data: Item, message: "Item update sucessfull!" });
};
//DELETE
export const deleteItem = async (req, res) => {
  const ItemId = req.params.id;

  const category_id = await prisma.item.findFirst({
    where: {
      id: Number(ItemId),
    },
  });
  //* decrement item count in category
  await prisma.category.update({
    where: {
      id: Number(category_id.category_id),
    },
    data: {
      item_count: {
        decrement: 1,
      },
    },
  });

  await prisma.item.delete({
    where: {
      id: Number(ItemId),
    },
  });

  return res.json({ status: 200, message: "Item deleted successfully" });
};






//Search by name
export const searchItem = async (req, res) => {
  try {
    const findC  = req.query.name;

    if (!findC) {
      return res.status(400).json({ status: 400, msg: "Name parameter is required for the search." });
    }

    const foundItems = await prisma.item.findMany({
      take:5,
      where: {
        name: {
          startsWith: findC,
          mode: 'insensitive', // Case-insensitive search
        },
      },
      include:{
        category:true
      },
      orderBy:{
        name:"asc"
      }

    });
    return res.json({ status: 200, data: foundItems });

  } catch (error) {
    console.error("Error searching for items:", error);
    return res.status(500).json({ status: 500, msg: "Internal server error" });
  }
};

// Search by category name
export const searchItemByCategory = async (req, res) => {
  try {
    const categoryName = req.query.name;
    console.log(categoryName);

    if (!categoryName) {
      return res.status(400).json({ status: 400, msg: "Name parameter is required for the search." });
    }

    const foundItems = await prisma.item.findMany({
      where: {
        category: {
          name: {
            startsWith: categoryName,
            mode: 'insensitive', // Case-insensitive search
          },
        },
      },
      include: {
        category: true,
      },
      // orderBy: {
      //   name: "asc",
      // },
    });

    return res.json({ status: 200, data: foundItems });

  } catch (error) {
    console.error("Error searching for items by category:", error);
    return res.status(500).json({ status: 500, msg: "Internal server error" });
  }
};
