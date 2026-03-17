import express from "express";
import { getDashboardCharts, seedDashboardCharts } from "../controllers/dashboard-controller.js";
import { getBigChart, seedBigChart } from "../controllers/big-chart-controller.js";

const DashboardChartsRouter = express.Router();

DashboardChartsRouter.post("/seed-dashboard-charts", seedDashboardCharts);
DashboardChartsRouter.get("/get-dashboard-charts", getDashboardCharts);

DashboardChartsRouter.post("/seed-big-charts", seedBigChart);
DashboardChartsRouter.get("/get-big-charts", getBigChart);

export default DashboardChartsRouter;