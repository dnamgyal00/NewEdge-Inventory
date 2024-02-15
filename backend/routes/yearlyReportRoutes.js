import {Router} from "express";
import { generateReport ,fetchReport,getUniqueYears, fetchReportExcelData} from "../Controller/yearlyReportController.js";

const yearlyReport = Router();

yearlyReport.get("/",fetchReport);//?year=&page=
yearlyReport.post("/excel",fetchReportExcelData);//?year=&category=

yearlyReport.post("/generate",generateReport); //?year=

yearlyReport.get("/pastyear",getUniqueYears);

export default yearlyReport;