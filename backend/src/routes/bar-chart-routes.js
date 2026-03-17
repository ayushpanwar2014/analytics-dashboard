import express from "express";
import { getBarCharts, seedBarCharts } from "../controllers/bar-chart-controller.js";

const BarChartsRouter = express.Router();

//Get
BarChartsRouter.get("/get-bar-charts", getBarCharts);

//Post
BarChartsRouter.post("/seed-bar-charts", seedBarCharts);

export default BarChartsRouter;