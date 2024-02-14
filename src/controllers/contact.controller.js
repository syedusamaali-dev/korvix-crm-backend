import Contact from "../models/Contact.js";
import Company from "../models/Company.js";
import { validationResult } from "express-validator";

export const createContact = async (req, res) => {
  try {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(400).json({
        success: false,
        errors: errors.array(),
      });
    }

    const company = await Company.findById(req.body.company);

    if (!company || company.isDeleted) {
      return res.status(404).json({
        success: false,
        message: "Company not found.",
      });
    }

    const exists = await Contact.findOne({
      email: req.body.email,
      isDeleted: false,
    });

    if (exists) {
      return res.status(400).json({
        success: false,
        message: "Contact already exists.",
      });
    }

    const contact = await Contact.create({
      ...req.body,
      owner: req.user._id,
    });

    res.status(201).json({
      success: true,
      message: "Contact created successfully.",
      data: contact,
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};