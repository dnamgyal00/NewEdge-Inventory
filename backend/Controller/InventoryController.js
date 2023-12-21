import prisma from "../DB/db.config.js";
//---------------------INVENTORY----------------------//

//CATEGORY
export const createCategory = async (req, res) => {
  const { name, description } = req.body;

  const newCategory = await prisma.category.create({
    data: {
      name: name,
      description: description,
    },
  });
  return res.json({ status: 200, data: newCategory, msg: "Category Created" });
};

export const fetchCategories = async (req, res) => {
  const categories = await prisma.category.findMany({});
  return res.json({ status: 200, data: categories });
};

export const fetchCategory = async (req, res) => {
  const categoryId = req.params.id;
  const category = await prisma.category.findFirst({
    where: {
      id: Number(categoryId),
    },
  });
  return res.json({ status: 200, data: category });
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
};

//ITEM
export const createItem = async (req, res) => {
  const { category_id, name, unit, description, qty_on_hand } = req.body;

  const newItem = await prisma.itemInstance.create({
    data: {
      category_id: category_id,
      name: name,
      unit: unit,
      description: description,
      qty_on_hand: qty_on_hand,
    },
  });
  return res.json({ status: 200, data: newItem, msg: "Item Created!" });
};

export const fetchItems = async (req, res) => {
  const itmes = await prisma.item.findMany({});
  return res.json({ status: 200, data: itmes });
};

export const fetchItem = async (req, res) => {
  const ItemId = req.params.id;
  const Item = await prisma.item.findFirst({
    where: {
      id: Number(ItemId),
    },
  });
  return res.json({ status: 200, data: Item });
};

export const updateItem = async (req, res) => {
  const ItemId = req.params.id;
  const { category_id, name, unit, description, qty_on_hand } = req.body;

  const Item = await prisma.item.update({
    where: {
      id: Number(ItemId),
    },
    data: {
      category_id: category_id,
      name: name,
      unit: unit,
      description: description,
      qty_on_hand: qty_on_hand,
    },
  });
  res.json({ status: 200, data: Item, message: "Item update sucessfull!" });
};

export const deleteItem = async (req, res) => {
  const ItemId = req.params.id;
  await prisma.item.delete({
    where: {
      id: Number(ItemId),
    },
  });

  return res.json({ status: 200, message: "Item deleted successfully" });
};

//ITEM_INSTANCE
export const createItemInstance = async (req, res) => {
    const {item_id,status } = req.body;
  
    const newItemInstance = await prisma.ItemInstance.create({
      data: {
        item_id:item_id,
        status:status
      },
    });
    return res.json({ status: 200, data: newItemInstance, msg: "Item Instance Created!" });
  };
  
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
  
  export const updateItemInstance = async (req, res) => {
    const ItemInstanceId = req.params.id;
    const {item_id,status } = req.body;
  
    const ItemInstance = await prisma.itemInstance.update({
      where: {
        id: Number(ItemInstanceId),
      },
      data: {
        item_id:item_id,
        status:status
      },
    });
    res.json({ status: 200, data: ItemInstance, message: "Item Instance update sucessfull!" });
  };
  
  export const deleteItemInstance = async (req, res) => {
    const ItemInstanceId = req.params.id;
    await prisma.itemInstance.delete({
      where: {
        id: Number(ItemInstanceId),
      },
    });
  
    return res.json({ status: 200, message: "Item Instance deleted successfully" });
  };