import prisma from "../utils/db.config.js";
import fs from 'fs';
import minioClient from "../utils/minioClient.js";


//CATEGORY
// export const createCategory = async (req, res) => {
//   try {
//     const { name, description } = req.body;
//     const file = req.file;

//     console.log(req)

//     if (!file) {
//       return res.json({ status: false, message: 'No file uploaded' });
//     }

//     // Check if a category with the same name already exists
//     const existingCategory = await prisma.category.findUnique({
//       where: {
//         name: name,
//       },
//     });

//     if (existingCategory) {
//       // Delete the local file
//       fs.unlink(`public/category/${file.originalname}`, (err1) => {
//         if (err1) {
//           console.log(err1);
//         } else {
//           console.log('Local file deleted successfully.');
//         }
//       });

//       return res.status(400).json({ status: 400, msg: 'Category with this name already exists. Please enter another name.' });
//     }

//     // Extract the file extension from the original filename
//     const lastDotIndex = file.originalname.lastIndexOf('.');
//     const fileExtension = file.originalname.slice(lastDotIndex + 1);

//     // Create a new filename with the desired format (e.g., replacing spaces with underscores)
//     //const newFileName = `${name.replace(/ /g, '_')}_image.${fileExtension}`;
//     const newFileName = `${name.replace(/ /g, '_')}_image.${fileExtension}`;

//     try {
//       await minioClient.fPutObject('inventory-category', `${newFileName}`, `public/category/${file.originalname}`);
//     } catch (uploadError) {
//       console.error(uploadError);
//       fs.unlink(`public/category/${file.originalname}`, (err3) => {
//         if (err3) {
//           console.error(err3);
//         } else {
//           console.log('Local file deleted successfully.');
//         }
//       });
//       return res.status(500).json({ status: 500, msg: `Error uploading file to Minio. ${uploadError.message}` });
//     }

//     // Delete the local file after successful Minio upload
//     fs.unlink(`public/category/${file.originalname}`, (err3) => {
//       if (err3) {
//         console.error(err3);
//       } else {
//         console.log('Local file deleted successfully.');
//       }
//     });

//     const url = await minioClient.presignedGetObject('inventory-category', newFileName);
//     console.log(`Pre-signed URL: ${url}`);

//     const newCategory = await prisma.category.create({
//       data: {
//         name: name,
//         description: description,
//         image: url,
//       },
//     });
//     return res.status(200).json({ status: 200, data: newCategory, msg: 'Category Created' });
//   } catch (error) {
//     console.error('Error: ', error);
//     return res.status(500).json({ status: 500, msg: 'Internal server error' });
//   }
// };
export const createCategory = async (req, res) => {
  try {
    const { name, description } = req.body;
    const file = req.file;

    let url = null; // Initialize url variable

    if (file) {
      // If file is uploaded
      // Extract the file extension from the original filename
      const lastDotIndex = file.originalname.lastIndexOf('.');
      const fileExtension = file.originalname.slice(lastDotIndex + 1);

      // Create a new filename with the desired format (e.g., replacing spaces with underscores)
      const newFileName = `${name.replace(/ /g, '_')}_image.${fileExtension}`;

      try {
        await minioClient.fPutObject('inventory-category', `${newFileName}`, `public/category/${file.originalname}`);
        // Delete the local file after successful Minio upload
        fs.unlink(`public/category/${file.originalname}`, (err3) => {
          if (err3) {
            console.error(err3);
          } else {
            console.log('Local file deleted successfully.');
          }
        });

        url = await minioClient.presignedGetObject('inventory-category', newFileName);
        console.log(`Pre-signed URL: ${url}`);
      } catch (uploadError) {
        console.error(uploadError);
        fs.unlink(`public/category/${file.originalname}`, (err3) => {
          if (err3) {
            console.error(err3);
          } else {
            console.log('Local file deleted successfully.');
          }
        });
        return res.status(500).json({ status: 500, msg: `Error uploading file to Minio. ${uploadError.message}` });
      }
    }

    // Create category even if no file is uploaded
    const newCategory = await prisma.category.create({
      data: {
        name: name,
        description: description,
        image: url, // Assign the URL if it exists, otherwise, it remains null
      },
    });

    return res.status(200).json({ status: 200, data: newCategory, msg: 'Category Created' });
  } catch (error) {
    console.error('Error: ', error);
    return res.status(500).json({ status: 500, msg: 'Internal server error' });
  }
};


// export const fetchCategoriess = async (req, res) => {
//   try{
//     const page = req.query.page || 1;
//   const itemsPerPage = 10;
//   const skip = (page - 1) * itemsPerPage;

//   if(req.query.page>=1){
//     const categories = await prisma.category.findMany({
//       orderBy: {
//         name: "asc",
//       },
//       skip,
//       take: itemsPerPage,
//     });
//     return res.json({ status: 200, data: categories });
//   }

//   const categories = await prisma.category.findMany({
//     orderBy: {
//       name: "asc",
//     },
//   });
//   return res.json({ status: 200, data: categories });
//   }catch(error){
//     console.error(error);
//     return res.status(500).json({ status: 500, msg: "Internal server error" });
//   }
// };

export const fetchCategories = async (req, res) => {
  try{
  const page = req.query.page || 1;
  const itemsPerPage = 10;
  const skip = (page - 1) * itemsPerPage;

  const nameOrder = req.query.nameOrder||"";
  const item_count_order = req.query.itemCountOrder||"";

  const orderBy = [
    {
      ...(nameOrder !== "" && {name: nameOrder}),
    },
    {
      ...(item_count_order !== "" && { item_count: item_count_order }),
    },
  ];

  const totalCount = await prisma.category.count();

    // Calculate total number of pages
  const totalPages = Math.ceil(totalCount / itemsPerPage);

  if(req.query.page>=1){
    const categories = await prisma.category.findMany({
      orderBy,
      skip,
      take: itemsPerPage,
    });
    return res.json({ status: 200, data: categories, msg:"Pagenation data" , totalPages:totalPages});
  }

  const categories = await prisma.category.findMany({
    orderBy,
  });
  return res.json({ status: 200, data: categories ,msg:"no pagenation",totalPages:totalPages});

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
  try {
    const categoryId = req.params.id;
    const { name, description } = req.body;
    const file = req.file;

    // Check if a category with the provided ID exists
    const existingCategory = await prisma.category.findUnique({
      where: {
        id: Number(categoryId),
      },
    });

    if (!existingCategory) {
      return res.status(404).json({ status: 404, msg: 'Category not found' });
    }

    if(existingCategory.name!==name){

      const existingCategoryName = await prisma.category.findUnique({
        where: {
          name: name,
        },
      });
  
      if (existingCategoryName) {
        return res.status(400).json({ status: 400, msg: 'Category with this name already exists. Please enter another name.' });
      }

    }

   

    // If the user provided a new image file, update the image
    if (file) {
      // Delete the existing image from Minio
      if (existingCategory.image) {
        const url = new URL(existingCategory.image);
        const pathSegments = url.pathname.split('/');
        const existingImageName = pathSegments[pathSegments.length - 1];
        console.log("Delete: ", existingImageName);

        minioClient.removeObject('inventory-category', existingImageName, (err) => {
          if (err) {
            console.error(err);
            return res.status(500).json({ status: 500, msg: 'Error deleting existing image from Minio.' });
          } else {
            console.log('Existing image deleted from Minio successfully.');
          }
        });
      }

      // Extract the file extension from the original filename
      const lastDotIndex = file.originalname.lastIndexOf('.');
      const fileExtension = file.originalname.slice(lastDotIndex + 1);

      // Create a new filename with the desired format (e.g., replacing spaces with underscores)
      const newFileName = `${name.replace(/ /g, '_')}_image.${fileExtension}`;

      // Upload the new image to Minio
      try {
        await minioClient.fPutObject('inventory-category', `${newFileName}`, `public/category/${file.originalname}`);
      } catch (uploadError) {
        console.error(uploadError);
        fs.unlink(`public/category/${file.originalname}`, (err) => {
          if (err) {
            console.error(err);
          } else {
            console.log('Local file deleted successfully.');
          }
        });
        return res.status(500).json({ status: 500, msg: 'Error uploading new image to Minio.' });
      }

      // Delete the local file after successful Minio upload
      fs.unlink(`public/category/${file.originalname}`, (err) => {
        if (err) {
          console.error(err);
        } else {
          console.log('Local file deleted successfully.');
        }
      });

      const url = await minioClient.presignedGetObject('inventory-category', newFileName);
      console.log(`Pre-signed URL: ${url}`);
      // Update the category information with the new image URL
      const updatedCategory = await prisma.category.update({
        where: {
          id: Number(categoryId),
        },
        data: {
          name: name,
          description: description,
          image: url,
        },
      });

      return res.status(200).json({ status: 200, data: updatedCategory, msg: 'Category updated successfully' });
    } else {
      // If no new image is provided, update only the text information
    
        const updatedCategory = await prisma.category.update({
          where: {
            id: Number(categoryId),
          },
          data: {
            name: name,
            description: description,
          },
        });
        return res.status(200).json({ status: 200, data: updatedCategory, msg: 'Category updated successfully' });
    }
  } catch (error) {
    console.error(error);
    return res.status(500).json({ status: 500, msg: 'Internal server error' });
  }
};

export const deleteCategory = async (req, res) => {
  try {
    const categoryId = req.params.id;

    // Get the image URL from the category before deleting it
    const category = await prisma.category.findUnique({
      where: {
        id: Number(categoryId),
      },
    });

   // Delete the category from the database
    await prisma.category.delete({
      where: {
        id: Number(categoryId),
      },
    });

    // If the category has an image, delete it from Minio
    if (category && category.image) {
      // Extract the image name from the URL 
      const url = new URL(category.image);
      const pathSegments = url.pathname.split('/');
      const imageName = pathSegments[pathSegments.length - 1];
      console.log("Delete: ", imageName);

      minioClient.removeObject('inventory-category', imageName, (err) => {
        if (err) {
          console.error(err);
          return res.status(500).json({ status: 500, msg: 'Error deleting image from Minio.' });
        } else {
          console.log('Image deleted from Minio successfully.');
        }
      });
    }

    return res.json({ status: 200, message: 'Category deleted successfully' });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ status: 500, msg: "Internal server error" });
  }
};




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
    
     // Check if no categories are found
     console.log(foundCategories.length)
     if (foundCategories.length === 0) {
      return res.json({ status: 404, msg: "Category not found" });
    }

    return res.json({ status: 200, data: foundCategories });
    

  } catch (error) {
    console.error("Error searching for categories:", error);
    return res.status(500).json({ status: 500, msg: "Internal server error" });
  }
};