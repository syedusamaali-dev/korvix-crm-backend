import express from "express";

import {
  createTask,
  getTasks,
  getTaskById,
  updateTask,
  deleteTask,
  getMyTasks,
  getUpcomingTasks,
  getOverdueTasks
} from "../controllers/task.controller.js";

import { protect } from "../middlewares/auth.middleware.js";

const router = express.Router();

// Create
router.post("/", protect, createTask);

// Special routes FIRST
router.get("/my", protect, getMyTasks);

// General list
router.get("/", protect, getTasks);
router.get("/upcoming", protect, getUpcomingTasks);
router.get("/overdue", protect, getOverdueTasks);
// Dynamic route AFTER special routes
router.get("/:id", protect, getTaskById);

// Update
router.put("/:id", protect, updateTask);

// Delete
router.delete("/:id", protect, deleteTask);

export default router;