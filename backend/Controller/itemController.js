import prisma from "../utils/db.config.js";
import fs from 'fs';
import minioClient from "../utils/minioClient.js";


//CREATE
export const createItem = async (req, res) => {
  try {
    const { category_id, name, unit, description, brand, unit_price } = req.body;
    const file = req.file;

    let url = null; // Initialize url variable

    if (file) {
      // If file is uploaded
      try {
        const newFileName = await handleImageUpload(file, name, brand);
        url = await minioClient.presignedGetObject('inventory', newFileName);
        console.log(`Pre-signed URL: ${url}`);
      } catch (error) {
        console.error(error);
        await handleImageUploadError(file);
        return res.status(500).json({ status: 500, msg: `Error creating item. ${error.message}` });
      }
    }

    try {
      // Increment item counter in category
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
          unit_price: Number(unit_price),
          description: description,
          image: url,
        },
      });

      return res.json({ status: 200, data: newItem, msg: 'Item Created!' });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ status: 500, msg: `Internal server error. ${error.message}` });
    }
  } catch (error) {
    console.error(error);
    return res.status(500).json({ status: 500, msg: `Internal server error. ${error.message}` });
  }
};

async function handleImageUpload(file, itemName, brand) {
  const lastDotIndex = file.originalname.lastIndexOf('.');
  const fileExtension = file.originalname.slice(lastDotIndex + 1);

  const newFileName = `${itemName.replace(/ /g, '_')}_${brand}_image.${fileExtension}`;
  console.log(newFileName);

  await minioClient.fPutObject('inventory', newFileName, `public/item/${file.originalname}`);
  return newFileName;
}

async function handleImageUploadError(file) {
  await deleteLocalImage(file.originalname);
}

async function deleteLocalImage(localImageName) {
  return new Promise((resolve, reject) => {
    fs.unlink(`public/item/${localImageName}`, (err) => {
      if (err) {
        console.error(err);
        reject(err);
      } else {
        console.log('Local file deleted successfully.');
        resolve();
      }
    });
  });
}

//READ
export const fetchItems = async (req, res) => {
  try {
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

    // Fetch total count of items
    const totalCount = await prisma.item.count({
      where: { ...filters },
    });

    // Calculate total number of pages
    const totalPages = Math.ceil(totalCount / pageSize);

    // Fetch items with applied filters and pagination
    const items = await prisma.item.findMany({
      ...baseQuery,
      where: { ...filters },
      skip,
      take: pageSize,
    });

    return res.json({ status: 200, data: items, totalPages:totalPages });
  } catch (error) {
    return res.json({ status: 404, msg: error });
  }
};

export const fetchItem = async (req, res) => {
  try {
    const itemId = req.params.id;
    const pageT = req.query.pageT || 1;
    const itemsPerPageT = 5;
    const skipT = (pageT - 1) * itemsPerPageT;

    const pageI = req.query.pageI || 1;
    const itemsPerPageI = 10;
    const skipI = (pageI - 1) * itemsPerPageI;

  
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
          skip:skipI,
          take: itemsPerPageI,
        },
        stock_in:{
          skip:skipT,
          take: itemsPerPageT,
        },
        stock_out:{
          skip:skipT,
          take: itemsPerPageT,
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


// UPDATE
export const updateItem = async (req, res) => {
  try {
    const itemId = req.params.id;
    const {name, brand, unit, unit_price, description} = req.body;
    const file = req.file;

    // Check if an item with the provided ID exists
    const existingItem = await prisma.item.findUnique({
      where: {
        id: Number(itemId),
      },
    });

    if (!existingItem) {
      return res.status(404).json({ status: 404, msg: 'Item not found' });
    }

    // If the user provided a new image file, update the image
    if (file) {
      // Delete the existing image from Minio
      if (existingItem.image) {
        const url = new URL(existingItem.image);
        const pathSegments = url.pathname.split('/');
        const existingImageName = pathSegments[pathSegments.length - 1];
        console.log("Delete: ", existingImageName);

        minioClient.removeObject('inventory', existingImageName, (err) => {
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
      const newFileName = `${name.replace(/ /g, '_')}_${brand}_image.${fileExtension}`;

      // Upload the new image to Minio
      try {
        await minioClient.fPutObject('inventory', `${newFileName}`, `public/item/${file.originalname}`);
      } catch (uploadError) {
        console.error(uploadError);
        fs.unlink(`public/item/${file.originalname}`, (err) => {
          if (err) {
            console.error(err);
          } else {
            console.log('Local file deleted successfully.');
          }
        });
        return res.status(500).json({ status: 500, msg: 'Error uploading new image to Minio.' });
      }

      // Delete the local file after successful Minio upload
      fs.unlink(`public/item/${file.originalname}`, (err) => {
        if (err) {
          console.error(err);
        } else {
          console.log('Local file deleted successfully.');
        }
      });

      const url = await minioClient.presignedGetObject('inventory', newFileName);
      console.log(`Pre-signed URL: ${url}`);
      // Update the item information with the new image URL
      const updatedItem = await prisma.item.update({
        where: {
          id: Number(itemId),
        },
        data: {
          //category_id: category_id,
          name: name,
          unit: unit,
          brand: brand,
          unit_price: Number(unit_price),
          description: description,
          image: url,
        },
      });

      return res.status(200).json({ status: 200, data: updatedItem, msg: 'Item updated successfully' });
    } else {
      // If no new image is provided, update only the text information
      const updatedItem = await prisma.item.update({
        where: {
          id: Number(itemId),
        },
        data: {
          //category_id: category_id,
          name: name,
          unit: unit,
          brand: brand,
          unit_price: Number(unit_price),
          description: description,
        },
      });
      return res.status(200).json({ status: 200, data: updatedItem, msg: 'Item updated successfully' });
    }
  } catch (error) {
    console.error(error);
    return res.status(500).json({ status: 500, msg: 'Internal server error' });
  }
};


// DELETE
export const deleteItem = async (req, res) => {
  try {
    const itemId = req.params.id;

    // Get the category_id of the item before deleting it
    const item = await prisma.item.findUnique({
      where: {
        id: Number(itemId),
      },
    });

    // Decrement the item count in the category
    await prisma.category.update({
      where: {
        id: Number(item.category_id),
      },
      data: {
        item_count: {
          decrement: 1,
        },
      },
    });

    // Delete the item from the database
    await prisma.item.delete({
      where: {
        id: Number(itemId),
      },
    });

    // If the item has an image, delete it from Minio
    if (item && item.image) {
      // Extract the image name from the URL
      const url = new URL(item.image);
      const pathSegments = url.pathname.split('/');
      const imageName = pathSegments[pathSegments.length - 1];
      console.log("Delete: ", imageName);

      minioClient.removeObject('inventory', imageName, (err) => {
        if (err) {
          console.error(err);
          return res.status(500).json({ status: 500, msg: 'Error deleting image from Minio.' });
        } else {
          console.log('Image deleted from Minio successfully.');
        }
      });
    }

    return res.json({ status: 200, message: 'Item deleted successfully' });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ status: 500, msg: "Internal server error" });
  }
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
      orderBy:{
        name:"asc"
      }

    });

   console.log(foundItems.length)
   if (foundItems.length === 0) {
     return res.json({ status: 404, msg: "Item not found" });
   }
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
