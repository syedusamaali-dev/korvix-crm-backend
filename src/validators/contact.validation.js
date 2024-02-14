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