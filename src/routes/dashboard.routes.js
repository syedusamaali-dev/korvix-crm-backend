import express from "express";

import { protect } from "../middlewares/auth.middleware.js ";

import {
  getDashboardOverview,
  getLeadsByStatus,
  getDealsByStage,
  getMonthlyRevenue,
  getMonthlyLeads,
  getMonthlyDeals,
  getRecentActivity
} from "../controllers/dashboard.controller.js";

const router = express.Router();

router.get("/overview", protect, getDashboardOverview);
router.get("/charts/leads-by-status", protect, getLeadsByStatus);
router.get("/charts/deals-by-stage", protect, getDealsByStage);
router.get("/charts/monthly-revenue", protect, getMonthlyRevenue);

router.get("/charts/monthly-leads", protect, getMonthlyLeads);
router.get("/charts/monthly-deals", protect, getMonthlyDeals);
router.get("/recent-activity", protect, getRecentActivity);

export default router;


// API LINKS
// GET /api/dashboard/overview
// GET /api/dashboard/charts/leads-by-status
// GET /api/dashboard/charts/monthly-leads
// GET /api/dashboard/charts/deals-by-stage
// GET /api/dashboard/charts/monthly-deals
// GET /api/dashboard/charts/monthly-revenue
// GET /api/dashboard/recent-activity
