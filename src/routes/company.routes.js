import express from "express";
import { protect } from "../middlewares/auth.middleware.js";
import { createCompany ,getCompanies , getCompanyById } from "../controllers/company.controller.js";
import { createCompanyValidation } from "../validators/company.validation.js";

const router = express.Router();

router.post("/", protect, createCompanyValidation, createCompany);
router.get("/", protect, getCompanies);
router.get("/:id", protect, getCompanyById);

export default router;
