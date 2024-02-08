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

export const getCustomers = async (req, res) => {
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
        { company: { $regex: search, $options: "i" } },
      ];
    }

    if (req.user.role === "admin") {
      delete filter.owner;
    }

    const customers = await Customer.find(filter)
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit);

    const total = await Customer.countDocuments(filter);

    res.status(200).json({
      success: true,
      total,
      page,
      pages: Math.ceil(total / limit),
      data: customers,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export const getCustomerById = async (req, res) => {
  try {
    const customer = await Customer.findById(req.params.id);

    if (!customer || customer.isDeleted) {
      return res.status(404).json({
        success: false,
        message: "Customer not found.",
      });
    }

    if (
      req.user.role !== "admin" &&
      customer.owner.toString() !== req.user._id.toString()
    ) {
      return res.status(403).json({
        success: false,
        message: "Access denied.",
      });
    }

    res.status(200).json({
      success: true,
      data: customer,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export const updateCustomer = async (req, res) => {
  try {
    const customer = await Customer.findById(req.params.id);

    if (!customer || customer.isDeleted) {
      return res.status(404).json({
        success: false,
        message: "Customer not found.",
      });
    }

    if (
      req.user.role !== "admin" &&
      customer.owner.toString() !== req.user._id.toString()
    ) {
      return res.status(403).json({
        success: false,
        message: "Access denied.",
      });
    }

    if (req.body.email && req.body.email !== customer.email) {
      const emailExists = await Customer.findOne({
        email: req.body.email,
      });

      if (emailExists) {
        return res.status(400).json({
          success: false,
          message: "Email already exists.",
        });
      }
    }

    Object.assign(customer, req.body);

    await customer.save();

    res.status(200).json({
      success: true,
      message: "Customer updated successfully.",
      data: customer,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export const deleteCustomer = async (req, res) => {
  try {
    const customer = await Customer.findById(req.params.id);

    if (!customer || customer.isDeleted) {
      return res.status(404).json({
        success: false,
        message: "Customer not found.",
      });
    }

    if (
      req.user.role !== "admin" &&
      customer.owner.toString() !== req.user._id.toString()
    ) {
      return res.status(403).json({
        success: false,
        message: "Access denied.",
      });
    }

    customer.isDeleted = true;

    await customer.save();

    res.status(200).json({
      success: true,
      message: "Customer deleted successfully.",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};