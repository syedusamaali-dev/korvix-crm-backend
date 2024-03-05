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


export const updateLeadValidation = [
  body("title")
    .optional()
    .trim(),

  body("company")
    .optional(),

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

  body("source")
    .optional()
    .isIn([
      "website",
      "facebook",
      "linkedin",
      "email",
      "phone",
      "referral",
      "advertisement",
      "other",
    ])
    .withMessage("Invalid source."),

  body("expectedCloseDate")
    .optional()
    .isISO8601()
    .withMessage("Invalid expected close date."),

  body("notes")
    .optional()
    .trim(),
];