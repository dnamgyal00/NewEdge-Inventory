import { Router } from "express";
import categoryRoutes from "./categoryRoutes.js";
import itemRoutes from "./itemRoutes.js";
import itemInstanceRoutes from "./itemInstanceRoutes.js";
import stockInRoutes from "./stockInRoutes.js";
import stockOutRoutes from "./stockOutRoutes.js";

const router=Router();
router.use("/api/category", categoryRoutes);
router.use("/api/item",itemRoutes);
router.use("/api/itemInstance",itemInstanceRoutes);
router.use("/api/stockIn",stockInRoutes);
router.use("/api/stockOut",stockOutRoutes);

export default router;