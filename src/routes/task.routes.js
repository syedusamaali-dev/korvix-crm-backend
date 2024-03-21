import express from "express";
import { protect } from "../middlewares/auth.middleware.js";
import { createTask, getTasks,getTaskById } from "../controllers/task.controller.js";

const router = express.Router();

router.post("/", protect, createTask);
router.get("/", protect, getTasks);
router.get("/:id", protect, getTaskById);
export default router;