import express from "express";
import { seedUsersAnalytics } from "../controllers/userAnalytics-controller.js";

const UserAnalyticsRouter = express.Router();

UserAnalyticsRouter.post("/seed-users-analytics", seedUsersAnalytics);
UserAnalyticsRouter.get("/get-users-analytics", seedUsersAnalytics);

export default UserAnalyticsRouter;