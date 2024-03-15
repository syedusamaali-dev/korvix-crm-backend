import express from "express";

import { protect } from "../middlewares/auth.middleware.js ";

import { getDashboardOverview } from "../controllers/dashboard.controller.js";

const router = express.Router();

router.get("/overview", protect, getDashboardOverview);

export default router;