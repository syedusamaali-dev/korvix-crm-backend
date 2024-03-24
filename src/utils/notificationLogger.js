import Notification from "../models/Notification.js";

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
};
