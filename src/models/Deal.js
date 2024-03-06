import mongoose from "mongoose";

const dealSchema = new mongoose.Schema(
  {
    dealCode: {
      type: String,
      unique: true,
      trim: true,
    },

    title: {
      type: String,
      required: true,
      trim: true,
    },

    lead: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Lead",
      required: true,
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

    value: {
      type: Number,
      default: 0,
    },

    stage: {
      type: String,
      enum: [
        "proposal",
        "negotiation",
        "contract",
        "closed-won",
        "closed-lost",
      ],
      default: "proposal",
    },

    probability: {
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

dealSchema.pre("save", async function () {
  if (!this.isNew) return;

  const lastDeal = await mongoose
    .model("Deal")
    .findOne()
    .sort({ createdAt: -1 });

  let nextNumber = 1;

  if (lastDeal?.dealCode) {
    const lastNumber = parseInt(
      lastDeal.dealCode.replace("DEAL-", ""),
      10
    );

    if (!isNaN(lastNumber)) {
      nextNumber = lastNumber + 1;
    }
  }

  this.dealCode = `DEAL-${String(nextNumber).padStart(6, "0")}`;
});

const Deal = mongoose.model("Deal", dealSchema);

export default Deal;