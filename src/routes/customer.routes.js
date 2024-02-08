import express from "express";
import { createCustomer , getCustomers} from "../controllers/customer.controller.js";
import { protect } from "../middlewares/auth.middleware.js";
import { createCustomerValidation } from "../validators/customer.validation.js";

const router = express.Router();

router.post(
  "/",
  protect,
  createCustomerValidation,
  createCustomer
);
router.get("/", protect, getCustomers);

export default router;