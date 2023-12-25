import { Router } from "express";
import {
  createItem,
  fetchItem,
  fetchItems,
  updateItem,
  deleteItem,
} from "../Controller/itemController.js";

const itemRoutes = Router();
//ITEM
itemRoutes.post("/", createItem);
itemRoutes.get("/", fetchItems);
itemRoutes.get("/:id", fetchItem);
itemRoutes.put("/:id", updateItem);
itemRoutes.delete("/:id", deleteItem);

export default itemRoutes;
