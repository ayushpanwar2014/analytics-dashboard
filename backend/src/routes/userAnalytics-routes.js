import express from "express";
import { getSingleUserAnalytics, getUsersAnalytics, seedUsersAnalytics } from "../controllers/userAnalytics-controller.js";

const UserAnalyticsRouter = express.Router();

UserAnalyticsRouter.post("/seed-users-analytics", seedUsersAnalytics);
UserAnalyticsRouter.get("/get-users-analytics", getUsersAnalytics);
UserAnalyticsRouter.get("/:id", getSingleUserAnalytics);

export default UserAnalyticsRouter;