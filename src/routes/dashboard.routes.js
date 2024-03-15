import express from "express";

import { protect } from "../middlewares/auth.middleware.js ";

import { getDashboardOverview , getLeadsByStatus , getDealsByStage} from "../controllers/dashboard.controller.js";

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

export default router;