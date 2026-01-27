import express from "express";
import { protect } from "../middlewares/auth.middleware.js";
import {
  getActivities,
  getActivityTimeline,
} from "../controllers/activity.controller.js";

const router = express.Router();
/**
 * @swagger
 * /api/activities:
 *   get:
 *     summary: Get activity logs
 *     tags:
 *       - Activities
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Activities retrieved successfully
 *       401:
 *         description: Unauthorized
 */
router.get("/", protect, getActivities);
/**
 * @swagger
 * /api/activities/{module}/{entityId}:
 *   get:
 *     summary: Get activity timeline
 *     tags:
 *       - Activities
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: module
 *         required: true
 *         schema:
 *           type: string
 *         example: deal
 *       - in: path
 *         name: entityId
 *         required: true
 *         schema:
 *           type: string
 *         example: 6a77748ba7204d3d81ec0e5e
 *     responses:
 *       200:
 *         description: Activity timeline retrieved successfully
 *       401:
 *         description: Unauthorized
 *       404:
 *         description: Entity not found
 */
router.get("/:module/:entityId", protect, getActivityTimeline);

export default router;