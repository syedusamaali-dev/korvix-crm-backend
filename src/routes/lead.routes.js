import express from "express";
import { protect } from "../middlewares/auth.middleware.js";

import { createLead , getLeads ,getLeadById , updateLead, deleteLead} from "../controllers/lead.controller.js";
import { createLeadValidation , updateLeadValidation} from "../validators/lead.validation.js";

const router = express.Router();

router.post(
  "/",
  protect,
  createLeadValidation,
  createLead
);

router.get("/", protect, getLeads);
router.get("/:id", protect, getLeadById);
router.put(
  "/:id",
  protect,
  updateLeadValidation,
  updateLead
);
router.delete(
  "/:id",
  protect,
  deleteLead
);
export default router;