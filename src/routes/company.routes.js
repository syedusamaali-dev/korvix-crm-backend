import express from "express";
import { protect } from "../middlewares/auth.middleware.js";
import { createCompany ,getCompanies , getCompanyById ,updateCompany, deleteCompany} from "../controllers/company.controller.js";
import { createCompanyValidation } from "../validators/company.validation.js";

const router = express.Router();

router.post("/", protect, createCompanyValidation, createCompany);
router.get("/", protect, getCompanies);
router.get("/:id", protect, getCompanyById);
router.put(
  "/:id",
  protect,
  createCompanyValidation,
  updateCompany
);

router.delete("/:id", protect, deleteCompany);

export default router;
