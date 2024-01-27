import {Router} from "express";
import {getTotalCategoriesAndItems, getTotalTransaction,getTopRecentTransactions,getGraphData } from "../Controller/dashboardController.js";

const dashboardRoutes = Router();

//For dashboard card 1
dashboardRoutes.get("/transactionNo",getTotalTransaction); //?timeRange=day

//For dashboard card 2
dashboardRoutes.get("/category_item_count",getTotalCategoriesAndItems);

//For dashboard card 3  
dashboardRoutes.get("/graph",getGraphData); //?timePeriod=

//For dashboard card 4
dashboardRoutes.get("/recentTransaction",getTopRecentTransactions);


export default dashboardRoutes;
