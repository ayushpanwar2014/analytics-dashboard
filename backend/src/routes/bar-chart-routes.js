import express from "express";
import { seedBarCharts } from "../controllers/bar-chart-controller.js";

const BarChartsRouter = express.Router();

BarChartsRouter.post("/seed-bar-charts", seedBarCharts);

export default BarChartsRouter;