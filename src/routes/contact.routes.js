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

 /**
  * @swagger
  * /api/contacts:
  *   post:
  *     summary: Create a contact
  *     tags:
  *       - Contacts
  *     security:
  *       - bearerAuth: []
  *     requestBody:
  *       required: true
  *       content:
  *         application/json:
  *           schema:
  *             type: object
  *     responses:
  *       201:
  *         description: Contact created successfully
  *       400:
  *         description: Validation error
  *       401:
  *         description: Unauthorized
  */
router.post("/", protect, createContactValidation, createContact);

/**
 * @swagger
 * /api/contacts:
 *   get:
 *     summary: Get all contacts
 *     tags:
 *       - Contacts
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Contacts retrieved successfully
 *       401:
 *         description: Unauthorized
 */
router.get("/", protect, getContacts);

/**
 * @swagger
 * /api/contacts/{id}:
 *   get:
 *     summary: Get contact by ID
 *     tags:
 *       - Contacts
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Contact retrieved successfully
 *       404:
 *         description: Contact not found
 *       401:
 *         description: Unauthorized
 */
router.get("/:id", protect, getContactById);

/**
 * @swagger
 * /api/contacts/{id}:
 *   put:
 *     summary: Update contact
 *     tags:
 *       - Contacts
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *     responses:
 *       200:
 *         description: Contact updated successfully
 *       400:
 *         description: Validation error
 *       404:
 *         description: Contact not found
 *       401:
 *         description: Unauthorized
 */
router.put("/:id", protect, updateContactValidation, updateContact);

/**
 * @swagger
 * /api/contacts/{id}:
 *   delete:
 *     summary: Delete contact
 *     tags:
 *       - Contacts
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Contact deleted successfully
 *       404:
 *         description: Contact not found
 *       401:
 *         description: Unauthorized
 */
router.delete("/:id", protect, deleteContact);
export default router;
