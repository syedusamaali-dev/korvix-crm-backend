import express from "express";
import { protect } from "../middlewares/auth.middleware.js";

import { createContact, getContacts, getContactById } from "../controllers/contact.controller.js";

import { createContactValidation } from "../validators/contact.validation.js";

const router = express.Router();

router.post("/", protect, createContactValidation, createContact);
router.get("/", protect, getContacts);
router.get("/:id", protect, getContactById);
export default router;
