import { body } from "express-validator";

export const createContactValidation = [
  body("firstName")
    .trim()
    .notEmpty()
    .withMessage("First name is required."),

  body("lastName")
    .trim()
    .notEmpty()
    .withMessage("Last name is required."),

  body("email")
    .isEmail()
    .withMessage("Valid email is required.")
    .normalizeEmail(),

  body("company")
    .notEmpty()
    .withMessage("Company is required."),
];


export const updateContactValidation = [
  body("firstName").optional().trim(),

  body("lastName").optional().trim(),

  body("email")
    .optional()
    .isEmail()
    .withMessage("Valid email is required.")
    .normalizeEmail(),

  body("company").optional(),
];