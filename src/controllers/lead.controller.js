import Lead from "../models/Lead.js";
import Company from "../models/Company.js";
import Contact from "../models/Contact.js";
import { validationResult } from "express-validator";

export const createLead = async (req, res) => {
  try {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(400).json({
        success: false,
        errors: errors.array(),
      });
    }

    // Check company exists
    const company = await Company.findById(req.body.company);

    if (!company || company.isDeleted) {
      return res.status(404).json({
        success: false,
        message: "Company not found.",
      });
    }

    // Check contact (if provided)
    if (req.body.contact) {
      const contact = await Contact.findById(req.body.contact);

      if (!contact || contact.isDeleted) {
        return res.status(404).json({
          success: false,
          message: "Contact not found.",
        });
      }

      // Enterprise validation
      if (contact.company.toString() !== company._id.toString()) {
        return res.status(400).json({
          success: false,
          message: "Selected contact does not belong to this company.",
        });
      }
    }

    const lead = await Lead.create({
      ...req.body,
      owner: req.user._id,
    });

    res.status(201).json({
      success: true,
      message: "Lead created successfully.",
      data: lead,
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};