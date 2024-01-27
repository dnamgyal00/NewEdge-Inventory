import { Router } from "express";
import categoryRoutes from "./categoryRoutes.js";
import itemRoutes from "./itemRoutes.js";
import itemInstanceRoutes from "./itemInstanceRoutes.js";
import transcationRoutes from "./transcationRoutes.js";
import dashboardRoutes from "./dashboardRoutes.js";
import yearlyReport from "./yearlyReportRoutes.js";


const router=Router();
router.use("/api/category", categoryRoutes);
router.use("/api/item",itemRoutes);
router.use("/api/itemInstance",itemInstanceRoutes);
router.use("/api/transaction",transcationRoutes);
router.use("/api/dashboard",dashboardRoutes);
router.use("/api/report",yearlyReport);


export default router;