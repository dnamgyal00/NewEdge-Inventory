import {Router} from "express";
import { generateReport , fetchReports,fetchReportsExcelData, getUniqueYears, getUniqueMonths,
   // ,fetchReport,getUniqueYears, fetchReportExcelData
} from "../Controller/monthlyReportController.js";

const monthlyReport = Router();

monthlyReport.get("/",fetchReports);//?year=&month=&page=&category=
monthlyReport.post("/excel",fetchReportsExcelData);//?year=&category=&month=

monthlyReport.post("/generate",generateReport); //?year=&month=


monthlyReport.get("/pastYear",getUniqueYears);
monthlyReport.get("/pastMonth",getUniqueMonths);

export default monthlyReport;