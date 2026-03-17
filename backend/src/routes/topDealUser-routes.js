import express from "express";
import { seedTopDealUsers } from "../controllers/topDealUser-controller.js";

const TopDealUserRouter = express.Router();

TopDealUserRouter.post("/seed-top-users", seedTopDealUsers);

export default TopDealUserRouter;