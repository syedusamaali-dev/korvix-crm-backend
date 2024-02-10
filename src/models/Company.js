import mongoose from "mongoose";

const companySchema = new mongoose.Schema(
  {
    companyName: {
      type: String,
      required: true,
      trim: true,
    },

    companyCode: {
      type: String,
      unique: true,
      trim: true,
    },

    industry: {
      type: String,
      default: "",
    },

    website: {
      type: String,
      default: "",
    },

    description: {
      type: String,
      default: "",
    },

    email: {
      type: String,
      lowercase: true,
      trim: true,
      default: "",
    },

    phone: {
      type: String,
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

    employees: {
      type: Number,
      default: 0,
    },

    annualRevenue: {
      type: Number,
      default: 0,
    },

    foundedYear: {
      type: Number,
      default: null,
    },

    status: {
      type: String,
      enum: ["active", "inactive", "prospect"],
      default: "prospect",
    },

    linkedin: {
      type: String,
      default: "",
    },

    facebook: {
      type: String,
      default: "",
    },

    twitter: {
      type: String,
      default: "",
    },

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
companySchema.pre("save", async function () {
  if (!this.isNew) return;

  const lastCompany = await mongoose
    .model("Company")
    .findOne()
    .sort({ createdAt: -1 });

  let nextNumber = 1;

  if (lastCompany?.companyCode) {
    const lastNumber = parseInt(
      lastCompany.companyCode.replace("COMP-", ""),
      10
    );

    if (!isNaN(lastNumber)) {
      nextNumber = lastNumber + 1;
    }
  }

  this.companyCode = `COMP-${String(nextNumber).padStart(6, "0")}`;
});
const Company = mongoose.model("Company", companySchema);

export default Company;