import prisma from "../DB/db.config.js";
//CREATE
export const createItem = async (req, res) => {
  const { category_id, name, unit, description, brand,unit_price } = req.body;

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
      category_id: category_id,
      name: name,
      unit: unit,
      brand: brand,
      unit_price:Number(unit_price),
      description: description,
    },
  });
  return res.json({ status: 200, data: newItem, msg: "Item Created!" });
};

//READ
export const fetchItems = async (req, res) => {
  const itmes = await prisma.item.findMany({
    orderBy: {
      name: "asc",
    },
    include: {
      category: true,
    },
  });
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

//UPDATE
export const updateItem = async (req, res) => {
  const ItemId = req.params.id;
  const { name, unit,brand,unit_price, description } = req.body;

  const Item = await prisma.item.update({
    where: {
      id: Number(ItemId),
    },
    data: {
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
