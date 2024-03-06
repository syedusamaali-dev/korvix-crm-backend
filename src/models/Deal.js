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

    expectedCloseDate: Date,

    notes: String,

    isDeleted: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);

