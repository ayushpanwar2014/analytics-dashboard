import express from "express";
import { getSingleUserAnalytics, getUsersAnalytics, seedUsersAnalytics } from "../controllers/userAnalytics-controller.js";
import { verifyToken } from '../../middlewares/user-verify-token.js';

const UserAnalyticsRouter = express.Router();

UserAnalyticsRouter.post("/seed-users-analytics", seedUsersAnalytics);
UserAnalyticsRouter.get("/get-users-analytics", getUsersAnalytics);
UserAnalyticsRouter.get("/:id", verifyToken, getSingleUserAnalytics);

export default UserAnalyticsRouter;