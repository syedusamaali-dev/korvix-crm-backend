import mongoose from "mongoose";

const taskSchema = new mongoose.Schema(
  {
    taskCode: {
      type: String,
      unique: true,
      trim: true,
    },

    title: {
      type: String,
      required: true,
      trim: true,
    },

    description: {
      type: String,
      trim: true,
    },

    assignedTo: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    lead: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Lead",
    },

    company: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Company",
    },

    contact: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Contact",
    },

    deal: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Deal",
    },

    priority: {
      type: String,
      enum: ["low", "medium", "high", "urgent"],
      default: "medium",
    },

    status: {
      type: String,
      enum: [
        "pending",
        "in-progress",
        "completed",
        "cancelled",
      ],
      default: "pending",
    },

    dueDate: {
      type: Date,
      required: true,
    },

    completedAt: Date,

    reminderDate: Date,

    isDeleted: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);

taskSchema.pre("save", async function () {
  if (!this.isNew) return;

  const lastTask = await mongoose
    .model("Task")
    .findOne()
    .sort({ createdAt: -1 });

  let nextNumber = 1;

  if (lastTask?.taskCode) {
    const lastNumber = parseInt(
      lastTask.taskCode.replace("TASK-", ""),
      10
    );

    if (!isNaN(lastNumber)) {
      nextNumber = lastNumber + 1;
    }
  }

  this.taskCode = `TASK-${String(nextNumber).padStart(6, "0")}`;
});

const Task = mongoose.model("Task", taskSchema);

export default Task;