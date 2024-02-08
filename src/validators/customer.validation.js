import { body } from "express-validator";

export const createCustomerValidation = [
  body("firstName")
    .notEmpty()
    .withMessage("First name is required")
    .trim(),

  body("lastName")
    .notEmpty()
    .withMessage("Last name is required")
    .trim(),

  body("email")
    .isEmail()
    .withMessage("Please enter a valid email")
    .normalizeEmail(),

  body("phone")
    .notEmpty()
    .withMessage("Phone number is required"),

  body("status")
    .optional()
    .isIn(["active", "inactive", "lead", "customer"])
    .withMessage("Invalid status"),

  body("source")
    .optional()
    .isIn([
      "website",
      "facebook",
      "linkedin",
      "referral",
      "email",
      "phone",
      "other",
    ])
    .withMessage("Invalid source"),
];