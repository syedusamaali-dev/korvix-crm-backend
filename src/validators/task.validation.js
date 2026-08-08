import Joi from "joi";

export const createTaskValidation = Joi.object({
  title: Joi.string().trim().required(),

  description: Joi.string().allow("", null),

  assignedTo: Joi.string().required(),

  lead: Joi.string().optional(),

  company: Joi.string().optional(),

  contact: Joi.string().optional(),

  deal: Joi.string().optional(),

  priority: Joi.string()
    .valid("low", "medium", "high", "urgent")
    .default("medium"),

  status: Joi.string()
    .valid(
      "pending",
      "in-progress",
      "completed",
      "cancelled"
    )
    .default("pending"),

  dueDate: Joi.date().required(),

  reminderDate: Joi.date().optional(),
});

export const updateTaskValidation = Joi.object({
  title: Joi.string().trim(),

  description: Joi.string().allow("", null),

  assignedTo: Joi.string(),

  lead: Joi.string().allow(null),

  company: Joi.string().allow(null),

  contact: Joi.string().allow(null),

  deal: Joi.string().allow(null),

  priority: Joi.string().valid(
    "low",
    "medium",
    "high",
    "urgent"
  ),

  status: Joi.string().valid(
    "pending",
    "in-progress",
    "completed",
    "cancelled"
  ),

  dueDate: Joi.date(),

  reminderDate: Joi.date().allow(null),

  completedAt: Joi.date().allow(null),
});