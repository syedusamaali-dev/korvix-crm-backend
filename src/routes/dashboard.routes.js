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

/**
 * @swagger
 * /api/dashboard/overview:
 *   get:
 *     summary: Get dashboard overview
 *     tags:
 *       - Dashboard
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Dashboard overview retrieved successfully
 *       401:
 *         description: Unauthorized
 */
router.get("/overview", protect, getDashboardOverview);

/**
 * @swagger
 * /api/dashboard/charts/leads-by-status:
 *   get:
 *     summary: Get leads by status
 *     tags:
 *       - Dashboard
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Leads grouped by status
 *       401:
 *         description: Unauthorized
 */
router.get("/charts/leads-by-status", protect, getLeadsByStatus);

/**
 * @swagger
 * /api/dashboard/charts/deals-by-stage:
 *   get:
 *     summary: Get deals by stage
 *     tags:
 *       - Dashboard
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Deals grouped by stage
 *       401:
 *         description: Unauthorized
 */
router.get("/charts/deals-by-stage", protect, getDealsByStage);

/**
 * @swagger
 * /api/dashboard/charts/monthly-revenue:
 *   get:
 *     summary: Get monthly revenue
 *     tags:
 *       - Dashboard
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Monthly revenue data retrieved successfully
 *       401:
 *         description: Unauthorized
 */
router.get("/charts/monthly-revenue", protect, getMonthlyRevenue);

/**
 * @swagger
 * /api/dashboard/charts/monthly-leads:
 *   get:
 *     summary: Get monthly leads
 *     tags:
 *       - Dashboard
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Monthly leads data retrieved successfully
 *       401:
 *         description: Unauthorized
 */
router.get("/charts/monthly-leads", protect, getMonthlyLeads);

/**
 * @swagger
 * /api/dashboard/charts/monthly-deals:
 *   get:
 *     summary: Get monthly deals
 *     tags:
 *       - Dashboard
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Monthly deals data retrieved successfully
 *       401:
 *         description: Unauthorized
 */
router.get("/charts/monthly-deals", protect, getMonthlyDeals);

/**
 * @swagger
 * /api/dashboard/recent-activity:
 *   get:
 *     summary: Get recent activity
 *     tags:
 *       - Dashboard
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Recent activity retrieved successfully
 *       401:
 *         description: Unauthorized
 */
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
