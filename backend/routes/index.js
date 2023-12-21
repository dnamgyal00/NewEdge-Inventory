import { Router } from "express";
import InventoryRoutes from "./inventoryRoutes.js";

const router=Router();
router.use("/api/inventory",InventoryRoutes);


export default router;