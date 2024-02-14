import express from "express";
import { protect } from "../middlewares/auth.middleware.js";

import {
  createContact,
  getContacts,
  getContactById,
  updateContact,
  deleteContact
} from "../controllers/contact.controller.js";

import { createContactValidation , updateContactValidation} from "../validators/contact.validation.js";

const router = express.Router();

router.post("/", protect, createContactValidation, createContact);
router.get("/", protect, getContacts);
router.get("/:id", protect, getContactById);
router.put("/:id", protect, updateContactValidation, updateContact);
router.delete("/:id", protect, deleteContact);
export default router;
