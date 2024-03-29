import Notification from "../models/Notification.js";
import { emitToUser } from "./socket.js";

export const createNotification = async ({
  recipient,
  type,
  title,
  message,
  module,
  entityId,
}) => {

  const notification = await Notification.create({
    recipient,
    type,
    title,
    message,
    module,
    entityId,
  });

  console.log("🔔 Notification created:", notification._id);

  console.log(
    "📡 Emitting notification to:",
    `user:${recipient.toString()}`
  );

  emitToUser(
    recipient.toString(),
    "notification:new",
    notification
  );

  console.log("✅ Notification emitted");

  return notification;
};