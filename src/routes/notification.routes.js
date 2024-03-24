import express from "express";

import {
  getNotifications,
  getUnreadNotifications,
  markNotificationAsRead,
  markAllNotificationsAsRead,
  deleteNotification,
} from "../controllers/notification.controller.js";

import { protect } from "../middlewares/auth.middleware.js";

const router = express.Router();

router.get("/", protect, getNotifications);

router.get("/unread", protect, getUnreadNotifications);

router.put("/read-all", protect, markAllNotificationsAsRead);

router.put("/:id/read", protect, markNotificationAsRead);

router.delete("/:id", protect, deleteNotification);

export default router;