import express from "express";
import { protect } from "../middlewares/auth.middleware.js";
import { createTask, getTasks,getTaskById,updateTask } from "../controllers/task.controller.js";

const router = express.Router();

router.post("/", protect, createTask);
router.get("/", protect, getTasks);
router.get("/:id", protect, getTaskById);
router.put("/:id", protect, updateTask);
export default router;