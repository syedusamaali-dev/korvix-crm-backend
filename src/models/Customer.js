import mongoose from "mongoose";

const customerSchema = new mongoose.Schema(
  {
    firstName: {
      type: String,
      required: true,
      trim: true,
    },

    lastName: {
      type: String,
      required: true,
      trim: true,
    },

    email: {
      type: String,
      required: true,
      lowercase: true,
      trim: true,
      unique: true,
    },

    phone: {
      type: String,
      required: true,
      trim: true,
    },

    company: {
      type: String,
      trim: true,
      default: "",
    },

    jobTitle: {
      type: String,
      trim: true,
      default: "",
    },

    website: {
      type: String,
      trim: true,
      default: "",
    },

    address: {
      type: String,
      default: "",
    },

    city: {
      type: String,
      default: "",
    },

    state: {
      type: String,
      default: "",
    },

    country: {
      type: String,
      default: "",
    },

    zipCode: {
      type: String,
      default: "",
    },

    status: {
      type: String,
      enum: ["active", "inactive", "lead", "customer"],
      default: "lead",
    },

    source: {
      type: String,
      enum: [
        "website",
        "facebook",
        "linkedin",
        "referral",
        "email",
        "phone",
        "other",
      ],
      default: "website",
    },

    industry: {
      type: String,
      default: "",
    },

    annualRevenue: {
      type: Number,
      default: 0,
    },

    employees: {
      type: Number,
      default: 0,
    },

    notes: {
      type: String,
      default: "",
    },

    tags: [
      {
        type: String,
      },
    ],

    owner: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
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

const Customer = mongoose.model("Customer", customerSchema);

export default Customer;