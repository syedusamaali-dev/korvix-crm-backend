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

export const getLeads = async (req, res) => {
  try {
    const page = Number(req.query.page) || 1;
    const limit = Number(req.query.limit) || 10;
    const skip = (page - 1) * limit;

    const search = req.query.search || "";

    const filter = {
      isDeleted: false,
      owner: req.user._id,
    };

    if (search) {
      filter.$or = [
        { title: { $regex: search, $options: "i" } },
        { leadCode: { $regex: search, $options: "i" } },
      ];
    }

    if (req.user.role === "admin") {
      delete filter.owner;
    }

    const leads = await Lead.find(filter)
      .populate("company", "companyCode companyName industry")
      .populate("contact", "contactCode firstName lastName email")
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit);

    const total = await Lead.countDocuments(filter);

    res.status(200).json({
      success: true,
      total,
      page,
      pages: Math.ceil(total / limit),
      data: leads,
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export const getLeadById = async (req, res) => {
  try {
    const lead = await Lead.findById(req.params.id)
      .populate("company", "companyCode companyName industry")
      .populate("contact", "contactCode firstName lastName email");

    if (!lead || lead.isDeleted) {
      return res.status(404).json({
        success: false,
        message: "Lead not found.",
      });
    }

    if (
      req.user.role !== "admin" &&
      lead.owner.toString() !== req.user._id.toString()
    ) {
      return res.status(403).json({
        success: false,
        message: "Access denied.",
      });
    }

    res.status(200).json({
      success: true,
      data: lead,
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export const updateLead = async (req, res) => {
  try {
    const lead = await Lead.findById(req.params.id);

    if (!lead || lead.isDeleted) {
      return res.status(404).json({
        success: false,
        message: "Lead not found.",
      });
    }

    if (
      req.user.role !== "admin" &&
      lead.owner.toString() !== req.user._id.toString()
    ) {
      return res.status(403).json({
        success: false,
        message: "Access denied.",
      });
    }

    if (req.body.company) {
      const company = await Company.findById(req.body.company);

      if (!company || company.isDeleted) {
        return res.status(404).json({
          success: false,
          message: "Company not found.",
        });
      }
    }

    if (req.body.contact) {
      const contact = await Contact.findById(req.body.contact);

      if (!contact || contact.isDeleted) {
        return res.status(404).json({
          success: false,
          message: "Contact not found.",
        });
      }

      const companyId = req.body.company || lead.company;

      if (contact.company.toString() !== companyId.toString()) {
        return res.status(400).json({
          success: false,
          message: "Contact does not belong to the selected company.",
        });
      }
    }

    Object.assign(lead, req.body);

    await lead.save();

    res.status(200).json({
      success: true,
      message: "Lead updated successfully.",
      data: lead,
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export const deleteLead = async (req, res) => {
  try {
    const lead = await Lead.findById(req.params.id);

    if (!lead || lead.isDeleted) {
      return res.status(404).json({
        success: false,
        message: "Lead not found.",
      });
    }

    if (
      req.user.role !== "admin" &&
      lead.owner.toString() !== req.user._id.toString()
    ) {
      return res.status(403).json({
        success: false,
        message: "Access denied.",
      });
    }

    lead.isDeleted = true;

    await lead.save();

    res.status(200).json({
      success: true,
      message: "Lead deleted successfully.",
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};