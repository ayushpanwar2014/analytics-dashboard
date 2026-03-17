import express from "express";
import { getDashboardCharts, seedDashboardCharts } from "../controllers/dashboard-controller.js";

const DashboardChartsRouter = express.Router();

DashboardChartsRouter.post("/seed-dashboard-charts", seedDashboardCharts);
DashboardChartsRouter.get("/get-dashboard-charts", getDashboardCharts);

export default DashboardChartsRouter;