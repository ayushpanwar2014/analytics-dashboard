import express from "express";
import { seedDashboardCharts } from "../controllers/dashboard-controller.js";

const DashboardChartsRouter = express.Router();

DashboardChartsRouter.post("/seed-dashboard-charts", seedDashboardCharts);

export default DashboardChartsRouter;