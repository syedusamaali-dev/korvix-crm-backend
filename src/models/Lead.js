import mongoose from "mongoose";

const leadSchema = new mongoose.Schema(
  {
    leadCode: {
      type: String,
      unique: true,
      trim: true,
    },

    title: {
      type: String,
      required: true,
      trim: true,
    },

    company: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Company",
      required: true,
    },

    contact: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Contact",
    },

    owner: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    source: {
      type: String,
      enum: [
        "website",
        "facebook",
        "linkedin",
        "email",
        "phone",
        "referral",
        "advertisement",
        "other",
      ],
      default: "website",
    },

    status: {
      type: String,
      enum: [
        "new",
        "qualified",
        "proposal",
        "negotiation",
        "won",
        "lost",
      ],
      default: "new",
    },

    priority: {
      type: String,
      enum: ["low", "medium", "high"],
      default: "medium",
    },

    estimatedValue: {
      type: Number,
      default: 0,
    },

    expectedCloseDate: {
      type: Date,
    },

    notes: {
      type: String,
      trim: true,
    },

    isDeleted: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);

leadSchema.pre("save", async function () {
  if (!this.isNew) return;

  const lastLead = await mongoose
    .model("Lead")
    .findOne()
    .sort({ createdAt: -1 });

  let nextNumber = 1;

  if (lastLead?.leadCode) {
    const lastNumber = parseInt(
      lastLead.leadCode.replace("LEAD-", ""),
      10
    );

    if (!isNaN(lastNumber)) {
      nextNumber = lastNumber + 1;
    }
  }

  this.leadCode = `LEAD-${String(nextNumber).padStart(6, "0")}`;
});

const Lead = mongoose.model("Lead", leadSchema);

export default Lead;