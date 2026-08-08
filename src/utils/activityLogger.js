import Activity from "../models/Activity.js";

export const logActivity = async ({
  action,
  module,
  entityId,
  entityCode,
  performedBy,
  description,
  metadata = {},
}) => {
  await Activity.create({
    action,
    module,
    entityId,
    entityCode,
    performedBy,
    description,
    metadata,
  });
};