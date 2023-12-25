import { Router } from "express";
import {
  createStockIn,
  fetchStockIn,
  fetchStockIns,
  updateStockIn,
  deleteStockIn,
} from "../Controller/stockInController.js";

const stockInRoutes = Router();
//StockIn
stockInRoutes.post("/", createStockIn);
stockInRoutes.get("/", fetchStockIns);
stockInRoutes.get("/:id", fetchStockIn);
stockInRoutes.put("/:id", updateStockIn);
stockInRoutes.delete("/:id", deleteStockIn);

export default stockInRoutes;
