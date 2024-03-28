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
  return await Notification.create({
    recipient,
    type,
    title,
    message,
    module,
    entityId,
  });
  // Send notification in real time
  emitToUser(recipient.toString(), "notification:new", notification);

  return notification;
};
