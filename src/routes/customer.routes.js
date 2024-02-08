import express from "express";
import { createCustomer , getCustomers , getCustomerById} from "../controllers/customer.controller.js";
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
router.get("/:id", protect, getCustomerById);

export default router;