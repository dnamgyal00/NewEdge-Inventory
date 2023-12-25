import { Router } from "express";
import {
  createStockOut,
  fetchStockOut,
  fetchStockOuts,
  updateStockOut,
  deleteStockOut,
} from "../Controller/stockOutController.js";

const stockOutRoutes = Router();
//StockOut
stockOutRoutes.post("/", createStockOut);
stockOutRoutes.get("/", fetchStockOuts);
stockOutRoutes.get("/:id", fetchStockOut);
stockOutRoutes.put("/:id", updateStockOut);
stockOutRoutes.delete("/:id", deleteStockOut);

export default stockOutRoutes;
