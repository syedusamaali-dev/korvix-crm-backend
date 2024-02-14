import express from "express";
import { protect } from "../middlewares/auth.middleware.js";

import { createContact } from "../controllers/contact.controller.js";

import { createContactValidation } from "../validators/contact.validation.js";

const router = express.Router();

router.post("/", protect, createContactValidation, createContact);

export default router;
