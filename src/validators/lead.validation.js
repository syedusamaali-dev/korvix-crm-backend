import { body } from "express-validator";

export const createLeadValidation = [
  body("title")
    .trim()
    .notEmpty()
    .withMessage("Lead title is required."),

  body("company")
    .notEmpty()
    .withMessage("Company is required."),

  body("contact")
    .optional(),

  body("estimatedValue")
    .optional()
    .isNumeric()
    .withMessage("Estimated value must be a number."),

  body("priority")
    .optional()
    .isIn(["low", "medium", "high"])
    .withMessage("Invalid priority."),

  body("status")
    .optional()
    .isIn([
      "new",
      "qualified",
      "proposal",
      "negotiation",
      "won",
      "lost",
    ])
    .withMessage("Invalid status."),
];