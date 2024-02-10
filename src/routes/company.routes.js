import express from "express";
import { protect } from "../middlewares/auth.middleware.js";
import { createCompany } from "../controllers/company.controller.js";
import { createCompanyValidation } from "../validators/company.validation.js";

const router = express.Router();

router.post("/", protect, createCompanyValidation, createCompany);

export default router;
