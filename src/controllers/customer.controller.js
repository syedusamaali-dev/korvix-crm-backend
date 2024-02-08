import Customer from "../models/Customer.js";
import { validationResult } from "express-validator";

export const createCustomer = async (req, res) => {
  try {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(400).json({
        success: false,
        errors: errors.array(),
      });
    }

    const {
      firstName,
      lastName,
      email,
      phone,
      company,
      jobTitle,
      website,
      address,
      city,
      state,
      country,
      zipCode,
      status,
      source,
      industry,
      annualRevenue,
      employees,
      notes,
      tags,
    } = req.body;

    const existingCustomer = await Customer.findOne({ email });

    if (existingCustomer) {
      return res.status(400).json({
        success: false,
        message: "Customer already exists.",
      });
    }

    const customer = await Customer.create({
      firstName,
      lastName,
      email,
      phone,
      company,
      jobTitle,
      website,
      address,
      city,
      state,
      country,
      zipCode,
      status,
      source,
      industry,
      annualRevenue,
      employees,
      notes,
      tags,
      owner: req.user._id,
    });

    res.status(201).json({
      success: true,
      message: "Customer created successfully.",
      data: customer,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};