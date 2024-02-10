import Company from "../models/Company.js";
import { validationResult } from "express-validator";

export const createCompany = async (req, res) => {
  try {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(400).json({
        success: false,
        errors: errors.array(),
      });
    }

    const existingCompany = await Company.findOne({
      companyName: req.body.companyName,
    });

    if (existingCompany) {
      return res.status(400).json({
        success: false,
        message: "Company already exists.",
      });
    }

    const company = await Company.create({
      ...req.body,
      owner: req.user._id,
    });

    res.status(201).json({
      success: true,
      message: "Company created successfully.",
      data: company,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};