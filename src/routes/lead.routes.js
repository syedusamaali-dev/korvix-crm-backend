import express from "express";
import { protect } from "../middlewares/auth.middleware.js";

import { createLead , getLeads ,getLeadById } from "../controllers/lead.controller.js";
import { createLeadValidation } from "../validators/lead.validation.js";

const router = express.Router();

router.post(
  "/",
  protect,
  createLeadValidation,
  createLead
);

router.get("/", protect, getLeads);
router.get("/:id", protect, getLeadById);

export default router;