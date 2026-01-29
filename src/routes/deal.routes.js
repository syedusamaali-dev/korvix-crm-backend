import express from "express";

import { protect } from "../middlewares/auth.middleware.js ";
import { createDeal,getDeals , getDealById , updateDeal , deleteDeal} from "../controllers/deal.controller.js";
import { createDealValidation , updateDealValidation} from "../validators/deal.validation.js";

const router = express.Router();
/**
 * @swagger
 * /api/deals:
 *   post:
 *     summary: Create a deal
 *     tags:
 *       - Deals
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
 *         description: Deal created successfully
 *       400:
 *         description: Validation error
 *       401:
 *         description: Unauthorized
 */
router.post(
  "/",
  protect,
  createDealValidation,
  createDeal
);

/**
 * @swagger
 * /api/deals:
 *   get:
 *     summary: Get all deals
 *     tags:
 *       - Deals
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Deals retrieved successfully
 *       401:
 *         description: Unauthorized
 */
router.get("/", protect, getDeals);

/**
 * @swagger
 * /api/deals/{id}:
 *   get:
 *     summary: Get deal by ID
 *     tags:
 *       - Deals
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
 *         description: Deal retrieved successfully
 *       404:
 *         description: Deal not found
 *       401:
 *         description: Unauthorized
 */
router.get("/:id", protect, getDealById);

/**
 * @swagger
 * /api/deals/{id}:
 *   put:
 *     summary: Update deal
 *     tags:
 *       - Deals
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
 *         description: Deal updated successfully
 *       400:
 *         description: Validation error
 *       404:
 *         description: Deal not found
 *       401:
 *         description: Unauthorized
 */
router.put(
  "/:id",
  protect,
  updateDealValidation,
  updateDeal
);

/**
 * @swagger
 * /api/deals/{id}:
 *   delete:
 *     summary: Delete deal
 *     tags:
 *       - Deals
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
 *         description: Deal deleted successfully
 *       404:
 *         description: Deal not found
 *       401:
 *         description: Unauthorized
 */
router.delete(
  "/:id",
  protect,
  deleteDeal
);

export default router;