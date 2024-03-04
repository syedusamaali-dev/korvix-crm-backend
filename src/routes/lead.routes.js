import express from "express";
import { protect } from "../middlewares/auth.middleware.js";

import { createLead } from "../controllers/lead.controller.js";
import { createLeadValidation } from "../validators/lead.validation.js";

const router = express.Router();

router.post(
  "/",
  protect,
  createLeadValidation,
  createLead
);

export default router;