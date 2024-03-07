import express from "express";

import { protect } from "../middlewares/auth.middleware.js ";
import { createDeal,getDeals } from "../controllers/deal.controller.js";
import { createDealValidation } from "../validators/deal.validation.js";

const router = express.Router();

router.post(
  "/",
  protect,
  createDealValidation,
  createDeal
);
router.get("/", protect, getDeals);

export default router;