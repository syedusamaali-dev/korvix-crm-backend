import express from "express";
import { protect } from "../middlewares/auth.middleware.js";

import { createLead , getLeads ,getLeadById , updateLead, deleteLead} from "../controllers/lead.controller.js";
import { createLeadValidation , updateLeadValidation} from "../validators/lead.validation.js";

const router = express.Router();
/**
 * @swagger
 * /api/leads:
 *   post:
 *     summary: Create a lead
 *     tags:
 *       - Leads
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *     responses:
 *       201:
 *         description: Lead created successfully
 *       400:
 *         description: Validation error
 *       401:
 *         description: Unauthorized
 */
router.post(
  "/",
  protect,
  createLeadValidation,
  createLead
);

/**
 * @swagger
 * /api/leads:
 *   get:
 *     summary: Get all leads
 *     tags:
 *       - Leads
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Leads retrieved successfully
 *       401:
 *         description: Unauthorized
 */
router.get("/", protect, getLeads);

/**
 * @swagger
 * /api/leads/{id}:
 *   get:
 *     summary: Get lead by ID
 *     tags:
 *       - Leads
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Lead retrieved successfully
 *       404:
 *         description: Lead not found
 *       401:
 *         description: Unauthorized
 */
router.get("/:id", protect, getLeadById);

/**
 * @swagger
 * /api/leads/{id}:
 *   put:
 *     summary: Update lead
 *     tags:
 *       - Leads
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *     responses:
 *       200:
 *         description: Lead updated successfully
 *       400:
 *         description: Validation error
 *       404:
 *         description: Lead not found
 *       401:
 *         description: Unauthorized
 */
router.put(
  "/:id",
  protect,
  updateLeadValidation,
  updateLead
);

/**
 * @swagger
 * /api/leads/{id}:
 *   delete:
 *     summary: Delete lead
 *     tags:
 *       - Leads
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Lead deleted successfully
 *       404:
 *         description: Lead not found
 *       401:
 *         description: Unauthorized
 */
router.delete(
  "/:id",
  protect,
  deleteLead
);
export default router;