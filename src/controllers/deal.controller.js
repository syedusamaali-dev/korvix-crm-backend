import Deal from "../models/Deal.js";
import Lead from "../models/Lead.js";
import Company from "../models/Company.js";
import Contact from "../models/Contact.js";
import { logActivity } from "../utils/activityLogger.js";


import { validationResult } from "express-validator";

export const createDeal = async (req, res) => {
  try {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(400).json({
        success: false,
        errors: errors.array(),
      });
    }

    // Check Lead
    const lead = await Lead.findById(req.body.lead);

    if (!lead || lead.isDeleted) {
      return res.status(404).json({
        success: false,
        message: "Lead not found.",
      });
    }
    if (lead.converted) {
      return res.status(400).json({
        success: false,
        message: "This lead has already been converted into a deal.",
      });
    }

    // Business Rule
    if (lead.status !== "won") {
      return res.status(400).json({
        success: false,
        message: "Only Won leads can be converted into deals.",
      });
    }

    // Check Company
    const company = await Company.findById(req.body.company);

    if (!company || company.isDeleted) {
      return res.status(404).json({
        success: false,
        message: "Company not found.",
      });
    }

    // Check Contact
    if (req.body.contact) {
      const contact = await Contact.findById(req.body.contact);

      if (!contact || contact.isDeleted) {
        return res.status(404).json({
          success: false,
          message: "Contact not found.",
        });
      }

      if (contact.company.toString() !== company._id.toString()) {
        return res.status(400).json({
          success: false,
          message: "Contact does not belong to this company.",
        });
      }
    }

    const deal = await Deal.create({
      ...req.body,
      owner: req.user._id,
    });
    lead.converted = true;
    lead.convertedAt = new Date();
    lead.deal = deal._id;
    await logActivity({
      action: "CREATE",
      module: "deal",
      entityId: deal._id,
      entityCode: deal.dealCode,
      performedBy: req.user._id,
      description: `Deal ${deal.title} created`,
    });
    await lead.save();

    res.status(201).json({
      success: true,
      message: "Deal created successfully.",
      data: deal,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export const getDeals = async (req, res) => {
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
        { dealCode: { $regex: search, $options: "i" } },
      ];
    }

    if (req.user.role === "admin") {
      delete filter.owner;
    }

    const deals = await Deal.find(filter)
      .populate("lead", "leadCode title status")
      .populate("company", "companyCode companyName industry")
      .populate("contact", "contactCode firstName lastName email")
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit);

    const total = await Deal.countDocuments(filter);

    res.status(200).json({
      success: true,
      total,
      page,
      pages: Math.ceil(total / limit),
      data: deals,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export const getDealById = async (req, res) => {
  try {
    const deal = await Deal.findById(req.params.id)
      .populate("lead", "leadCode title status")
      .populate("company", "companyCode companyName industry")
      .populate("contact", "contactCode firstName lastName email")
      .populate("owner", "firstName lastName email");

    if (!deal || deal.isDeleted) {
      return res.status(404).json({
        success: false,
        message: "Deal not found.",
      });
    }

    if (
      req.user.role !== "admin" &&
      deal.owner._id.toString() !== req.user._id.toString()
    ) {
      return res.status(403).json({
        success: false,
        message: "Access denied.",
      });
    }

    res.status(200).json({
      success: true,
      data: deal,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export const updateDeal = async (req, res) => {
  try {
    const deal = await Deal.findById(req.params.id);

    if (!deal || deal.isDeleted) {
      return res.status(404).json({
        success: false,
        message: "Deal not found.",
      });
    }

    if (
      req.user.role !== "admin" &&
      deal.owner.toString() !== req.user._id.toString()
    ) {
      return res.status(403).json({
        success: false,
        message: "Access denied.",
      });
    }

    // Validate Company
    if (req.body.company) {
      const company = await Company.findById(req.body.company);

      if (!company || company.isDeleted) {
        return res.status(404).json({
          success: false,
          message: "Company not found.",
        });
      }
    }

    // Validate Contact
    if (req.body.contact) {
      const contact = await Contact.findById(req.body.contact);

      if (!contact || contact.isDeleted) {
        return res.status(404).json({
          success: false,
          message: "Contact not found.",
        });
      }

      const companyId = req.body.company || deal.company;

      if (contact.company.toString() !== companyId.toString()) {
        return res.status(400).json({
          success: false,
          message: "Contact does not belong to the selected company.",
        });
      }
    }

    Object.assign(deal, req.body);

    await deal.save();

    res.status(200).json({
      success: true,
      message: "Deal updated successfully.",
      data: deal,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export const deleteDeal = async (req, res) => {
  try {
    const deal = await Deal.findById(req.params.id);

    if (!deal || deal.isDeleted) {
      return res.status(404).json({
        success: false,
        message: "Deal not found.",
      });
    }

    if (
      req.user.role !== "admin" &&
      deal.owner.toString() !== req.user._id.toString()
    ) {
      return res.status(403).json({
        success: false,
        message: "Access denied.",
      });
    }

    deal.isDeleted = true;

    await deal.save();

    res.status(200).json({
      success: true,
      message: "Deal deleted successfully.",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
