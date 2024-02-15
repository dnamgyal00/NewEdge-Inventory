import {Router} from "express";
import { getTransaction, getTransactionExcelData } from "../Controller/transactionController.js";
import { createStockIn, fetchStockIn, fetchStockIns } from "../Controller/stockInController.js";
import {createStockOut, fetchStockOut,fetchStockOuts} from "../Controller/stockOutController.js";

const transcationRoutes = Router();

transcationRoutes.get("/",getTransaction); 
// /transactions?startDate=2023-01-01&endDate=2023-12-31&category=Electronics&item=Laptop&transactionType=stockIn
transcationRoutes.post("/excel",getTransactionExcelData); 


transcationRoutes.get("/stockIn",fetchStockIns);
transcationRoutes.get("/stockIn/:id",fetchStockIn);
transcationRoutes.post("/stockIn",createStockIn);

transcationRoutes.get("/stockOut",fetchStockOuts);
transcationRoutes.get("/stockOut/:id",fetchStockOut);
transcationRoutes.post("/stockOut",createStockOut);

export default transcationRoutes;
