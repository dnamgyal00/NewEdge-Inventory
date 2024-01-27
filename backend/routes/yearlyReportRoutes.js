import {Router} from "express";
import { generateReport ,fetchReport} from "../Controller/yearlyReportController.js";

const yearlyReport = Router();
yearlyReport.get("/generate",generateReport);
yearlyReport.get("/",fetchReport);//?year=

export default yearlyReport;
