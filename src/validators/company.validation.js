import { body } from "express-validator";

export const createCompanyValidation = [
  body("companyName")
    .notEmpty()
    .withMessage("Company name is required")
    .trim(),

  body("email")
    .optional()
    .isEmail()
    .withMessage("Please enter a valid email")
    .normalizeEmail(),

  body("phone")
    .optional()
    .trim(),

  body("website")
    .optional()
    .isURL()
    .withMessage("Please enter a valid website URL"),

  body("status")
    .optional()
    .isIn(["active", "inactive"])
    .withMessage("Invalid status"),
];