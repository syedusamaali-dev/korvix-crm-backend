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

export const getContacts = async (req, res) => {
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
        { firstName: { $regex: search, $options: "i" } },
        { lastName: { $regex: search, $options: "i" } },
        { email: { $regex: search, $options: "i" } },
      ];
    }

    if (req.user.role === "admin") {
      delete filter.owner;
    }

    const contacts = await Contact.find(filter)
      .populate("company", "companyCode companyName industry")
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit);

    const total = await Contact.countDocuments(filter);

    res.status(200).json({
      success: true,
      total,
      page,
      pages: Math.ceil(total / limit),
      data: contacts,
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export const getContactById = async (req, res) => {
  try {
    const contact = await Contact.findById(req.params.id)
      .populate("company", "companyCode companyName industry");

    if (!contact || contact.isDeleted) {
      return res.status(404).json({
        success: false,
        message: "Contact not found.",
      });
    }

    if (
      req.user.role !== "admin" &&
      contact.owner.toString() !== req.user._id.toString()
    ) {
      return res.status(403).json({
        success: false,
        message: "Access denied.",
      });
    }

    res.status(200).json({
      success: true,
      data: contact,
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export const updateContact = async (req, res) => {
  try {
    const contact = await Contact.findById(req.params.id);

    if (!contact || contact.isDeleted) {
      return res.status(404).json({
        success: false,
        message: "Contact not found.",
      });
    }

    if (
      req.user.role !== "admin" &&
      contact.owner.toString() !== req.user._id.toString()
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

    Object.assign(contact, req.body);

    await contact.save();

    res.status(200).json({
      success: true,
      message: "Contact updated successfully.",
      data: contact,
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export const deleteContact = async (req, res) => {
  try {
    const contact = await Contact.findById(req.params.id);

    if (!contact || contact.isDeleted) {
      return res.status(404).json({
        success: false,
        message: "Contact not found.",
      });
    }

    if (
      req.user.role !== "admin" &&
      contact.owner.toString() !== req.user._id.toString()
    ) {
      return res.status(403).json({
        success: false,
        message: "Access denied.",
      });
    }

    contact.isDeleted = true;

    await contact.save();

    res.status(200).json({
      success: true,
      message: "Contact deleted successfully.",
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};