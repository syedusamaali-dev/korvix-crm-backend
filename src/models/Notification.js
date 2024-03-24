import mongoose from "mongoose";

const notificationSchema = new mongoose.Schema(
  {
    recipient: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    type: {
      type: String,
      enum: [
        "task-assigned",
        "task-due",
        "lead-assigned",
        "lead-converted",
        "deal-stage-changed",
        "deal-won",
        "system",
      ],
      required: true,
    },

    title: {
      type: String,
      required: true,
      trim: true,
    },

    message: {
      type: String,
      required: true,
      trim: true,
    },

    module: {
      type: String,
      enum: [
        "customer",
        "company",
        "contact",
        "lead",
        "deal",
        "task",
        "system",
      ],
    },

    entityId: {
      type: mongoose.Schema.Types.ObjectId,
    },

    isRead: {
      type: Boolean,
      default: false,
    },

    readAt: {
      type: Date,
    },
  },
  {
    timestamps: true,
  }
);

const Notification = mongoose.model(
  "Notification",
  notificationSchema
);

export default Notification;
