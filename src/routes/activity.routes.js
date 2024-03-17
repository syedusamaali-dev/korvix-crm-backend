import express from "express";
import { protect } from "../middlewares/auth.middleware.js";
import {
  getActivities,
  getActivityTimeline,
} from "../controllers/activity.controller.js";

const router = express.Router();

router.get("/", protect, getActivities);

router.get("/:module/:entityId", protect, getActivityTimeline);

export default router;