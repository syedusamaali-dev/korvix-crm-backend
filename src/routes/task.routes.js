import express from "express";
import { protect } from "../middlewares/auth.middleware.js";
import { createTask, getTasks } from "../controllers/task.controller.js";

const router = express.Router();

router.post("/", protect, createTask);
router.get("/", protect, getTasks);
export default router;