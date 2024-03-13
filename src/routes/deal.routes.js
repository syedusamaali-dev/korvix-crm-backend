import express from "express";

import { protect } from "../middlewares/auth.middleware.js ";
import { createDeal,getDeals , getDealById , updateDeal , deleteDeal} from "../controllers/deal.controller.js";
import { createDealValidation , updateDealValidation} from "../validators/deal.validation.js";

const router = express.Router();

router.post(
  "/",
  protect,
  createDealValidation,
  createDeal
);
router.get("/", protect, getDeals);
router.get("/:id", protect, getDealById);
router.put(
  "/:id",
  protect,
  updateDealValidation,
  updateDeal
);

router.delete(
  "/:id",
  protect,
  deleteDeal
);

export default router;