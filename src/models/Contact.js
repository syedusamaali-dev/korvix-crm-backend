import mongoose from "mongoose";

const contactSchema = new mongoose.Schema(
  {
    contactCode: {
      type: String,
      unique: true,
      trim: true,
    },

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
    },

    phone: {
      type: String,
      trim: true,
    },

    designation: {
      type: String,
      trim: true,
    },

    department: {
      type: String,
      trim: true,
    },

    company: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Company",
      required: true,
    },

    status: {
      type: String,
      enum: ["active", "inactive"],
      default: "active",
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

contactSchema.pre("save", async function () {
  if (!this.isNew) return;

  const lastContact = await mongoose
    .model("Contact")
    .findOne()
    .sort({ createdAt: -1 });

  let nextNumber = 1;

  if (lastContact?.contactCode) {
    const lastNumber = parseInt(
      lastContact.contactCode.replace("CONT-", ""),
      10
    );

    if (!isNaN(lastNumber)) {
      nextNumber = lastNumber + 1;
    }
  }

  this.contactCode = `CONT-${String(nextNumber).padStart(6, "0")}`;
});

const Contact = mongoose.model("Contact", contactSchema);

export default Contact;