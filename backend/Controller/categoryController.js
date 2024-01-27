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

//CATEGORY
export const createCategory = async (req, res) => {
  try{
    const { name, description } = req.body;
    const file = req.file;

    if(!req.file){
      res.send({
        status:false,
        message:"No file uploaded"
      })
    }else{ //upload image to Minio
      minioClient.fPutObject('inventory-category', file.originalname, `public/category/${file.originalname}`,  (err, etag) => {
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
      const url = await minioClient.presignedGetObject('inventory-category', file.originalname);
      console.log(`Pre-signed URL: ${url}`);

      const newCategory = await prisma.category.create({
        data: {
          name: name,
          description: description,
          image:url,
        },
      });

      return res.json({ status: 200, data: newCategory, msg: "Category Created" });

    }
    
  }catch(error){
    console.error("Error: ", error);
    return res.status(500).json({ status: 500, msg: error });
  }
};

export const fetchCategories = async (req, res) => {
  try{
    const page = req.query.page || 1;
  const itemsPerPage = 10;
  const skip = (page - 1) * itemsPerPage;

  if(req.query.page>=1){
    const categories = await prisma.category.findMany({
      include: {
        item: {
          orderBy: {
            name: "asc",
          },
        },
      },
      orderBy: {
        name: "asc",
      },
      skip,
      take: itemsPerPage,
    });
    return res.json({ status: 200, data: categories });
  }

  const categories = await prisma.category.findMany({
    include: {
      item: {
        orderBy: {
          name: "asc",
        },
      },
    },
    orderBy: {
      name: "asc",
    },
  });
  return res.json({ status: 200, data: categories });
  }catch(error){
    console.error(error);
    return res.status(500).json({ status: 500, msg: "Internal server error" });
  }
};

export const fetchCategory = async (req, res) => {
try{
  const categoryId = req.params.id;
  const page = req.query.page || 1;
  const itemsPerPage = 5;
  const skip = (page - 1) * itemsPerPage;

  const category = await prisma.category.findFirst({
    where: {
      id: Number(categoryId),
    },
    include: {
      item: {
        orderBy: {
          name: "asc",
        },
        skip,
        take: itemsPerPage,
      },
    },
  });
  return res.json({ status: 200, data: category });
}catch(error){
  console.error(error);
  return res.status(500).json({ status: 500, msg: "Internal server error" });
}
};



export const updateCategory = async (req, res) => {
  const categoryId = req.params.id;
  const { name, description } = req.body;

  const category = await prisma.category.update({
    where: {
      id: Number(categoryId),
    },
    data: {
      name: name,
      description: description,
    },
  });
  res.json({
    status: 200,
    data: category,
    message: "Category update sucessfull!",
  });
};




export const deleteCategory = async (req, res) => {
  const categoryId = req.params.id;
  await prisma.category.delete({
    where: {
      id: Number(categoryId),
    },
  });
  return res.json({ status: 200, message: "Category deleted successfully" });
}


//Search by name
export const searchCategory = async (req, res) => {
  try {
    const findC  = req.query.name;

    if (!findC) {
      return res.status(400).json({ status: 400, msg: "Name parameter is required for the search." });
    }

    const foundCategories = await prisma.category.findMany({
      take:5,
      where: {
        name: {
          startsWith: findC,
          mode: 'insensitive', // Case-insensitive search
        },
      },
      orderBy:{
        name:"asc"
      }

    });
    return res.json({ status: 200, data: foundCategories });

  } catch (error) {
    console.error("Error searching for categories:", error);
    return res.status(500).json({ status: 500, msg: "Internal server error" });
  }
};