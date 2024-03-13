import { body } from "express-validator";

export const createDealValidation = [
  body("title")
    .trim()
    .notEmpty()
    .withMessage("Deal title is required."),

  body("lead")
    .notEmpty()
    .withMessage("Lead is required."),

  body("company")
    .notEmpty()
    .withMessage("Company is required."),

  body("contact")
    .optional(),

  body("value")
    .optional()
    .isNumeric()
    .withMessage("Value must be numeric."),

  body("probability")
    .optional()
    .isNumeric()
    .withMessage("Probability must be numeric."),

  body("stage")
    .optional()
    .isIn([
      "proposal",
      "negotiation",
      "contract",
      "closed-won",
      "closed-lost",
    ])
    .withMessage("Invalid stage."),
];

export const updateDealValidation = [
  body("title")
    .optional()
    .trim(),

  body("lead")
    .optional(),

  body("company")
    .optional(),

  body("contact")
    .optional(),

  body("value")
    .optional()
    .isNumeric()
    .withMessage("Value must be numeric."),

  body("probability")
    .optional()
    .isNumeric()
    .withMessage("Probability must be numeric."),

  body("stage")
    .optional()
    .isIn([
      "proposal",
      "negotiation",
      "contract",
      "closed-won",
      "closed-lost",
    ])
    .withMessage("Invalid stage."),

  body("expectedCloseDate")
    .optional()
    .isISO8601()
    .withMessage("Invalid expected close date."),

  body("notes")
    .optional()
    .trim(),
];