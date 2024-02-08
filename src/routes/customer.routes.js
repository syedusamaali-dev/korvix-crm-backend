import express from "express";
import { createCustomer , getCustomers , getCustomerById , updateCustomer ,deleteCustomer} from "../controllers/customer.controller.js";
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

router.put(
  "/:id",
  protect,
  createCustomerValidation,
  updateCustomer
);

router.delete("/:id", protect, deleteCustomer);

export default router;