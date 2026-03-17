import express from "express";
import { seedUsersAnalytics } from "../controllers/userAnalytics-controller.js";

const UserAnalyticsRouter = express.Router();

UserAnalyticsRouter.post("/seed-users", seedUsersAnalytics);

export default UserAnalyticsRouter;