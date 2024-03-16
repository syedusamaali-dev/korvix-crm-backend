import express from "express";

import { protect } from "../middlewares/auth.middleware.js ";

import { getDashboardOverview , getLeadsByStatus , getDealsByStage,getMonthlyRevenue} from "../controllers/dashboard.controller.js";

const router = express.Router();

router.get("/overview", protect, getDashboardOverview);
router.get(
  "/charts/leads-by-status",
  protect,
  getLeadsByStatus
);
router.get(
  "/charts/deals-by-stage",
  protect,
  getDealsByStage
);
router.get(
  "/charts/monthly-revenue",
  protect,
  getMonthlyRevenue
);

export default router;