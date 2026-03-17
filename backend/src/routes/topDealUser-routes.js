import express from "express";
import { getTopDealUsers, seedTopDealUsers } from "../controllers/topDealUser-controller.js";

const TopDealUserRouter = express.Router();

TopDealUserRouter.post("/seed-top-users", seedTopDealUsers);
TopDealUserRouter.get("/get-top-users", getTopDealUsers);

export default TopDealUserRouter;