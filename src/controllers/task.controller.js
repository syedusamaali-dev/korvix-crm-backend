import Task from "../models/Task.js";
import User from "../models/User.js";
import Lead from "../models/Lead.js";
import Company from "../models/Company.js";
import Contact from "../models/Contact.js";
import Deal from "../models/Deal.js";

import {
  createTaskValidation, updateTaskValidation
} from "../validators/task.validation.js";

export const createTask = async (req, res) => {
  try {
    // Validate request body
    const { error } = createTaskValidation.validate(req.body);

    if (error) {
      return res.status(400).json({
        success: false,
        message: error.details[0].message,
      });
    }

    const {
      title,
      description,
      assignedTo,
      lead,
      company,
      contact,
      deal,
      priority,
      status,
      dueDate,
      reminderDate,
    } = req.body;

    // Validate Assigned User
    const assignedUser = await User.findById(assignedTo);

    if (!assignedUser) {
      return res.status(404).json({
        success: false,
        message: "Assigned user not found.",
      });
    }

    // Validate Lead
    if (lead) {
      const leadExists = await Lead.findById(lead);

      if (!leadExists) {
        return res.status(404).json({
          success: false,
          message: "Lead not found.",
        });
      }
    }

    // Validate Company
    if (company) {
      const companyExists = await Company.findById(company);

      if (!companyExists) {
        return res.status(404).json({
          success: false,
          message: "Company not found.",
        });
      }
    }

    // Validate Contact
    if (contact) {
      const contactExists = await Contact.findById(contact);

      if (!contactExists) {
        return res.status(404).json({
          success: false,
          message: "Contact not found.",
        });
      }
    }

    // Validate Deal
    if (deal) {
      const dealExists = await Deal.findById(deal);

      if (!dealExists) {
        return res.status(404).json({
          success: false,
          message: "Deal not found.",
        });
      }
    }

    // Create Task
    const task = await Task.create({
      title,
      description,
      assignedTo,
      createdBy: req.user._id,
      lead,
      company,
      contact,
      deal,
      priority,
      status,
      dueDate,
      reminderDate,
    });

    // Populate Task
    const populatedTask = await Task.findById(task._id)
      .populate("assignedTo", "firstName lastName email")
      .populate("createdBy", "firstName lastName email")
      .populate("lead", "title leadCode")
      .populate("company", "companyName companyCode")
      .populate("contact", "firstName lastName contactCode")
      .populate("deal", "title dealCode");

    return res.status(201).json({
      success: true,
      message: "Task created successfully.",
      data: populatedTask,
    });

  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export const getTasks = async (req, res) => {
  try {
    const page = Number(req.query.page) || 1;
    const limit = Number(req.query.limit) || 10;
    const skip = (page - 1) * limit;

    const {
      search,
      status,
      priority,
      assignedTo,
      sort = "-createdAt",
    } = req.query;

    const filter =
      req.user.role === "admin"
        ? { isDeleted: false }
        : {
            assignedTo: req.user._id,
            isDeleted: false,
          };

    if (status) {
      filter.status = status;
    }

    if (priority) {
      filter.priority = priority;
    }

    if (assignedTo && req.user.role === "admin") {
      filter.assignedTo = assignedTo;
    }

    if (search) {
      filter.title = {
        $regex: search,
        $options: "i",
      };
    }

    const total = await Task.countDocuments(filter);

    const tasks = await Task.find(filter)
      .populate("assignedTo", "firstName lastName email")
      .populate("createdBy", "firstName lastName")
      .populate("lead", "title leadCode")
      .populate("company", "companyName companyCode")
      .populate("contact", "firstName lastName contactCode")
      .populate("deal", "title dealCode")
      .sort(sort)
      .skip(skip)
      .limit(limit);

    return res.status(200).json({
      success: true,
      total,
      page,
      pages: Math.ceil(total / limit),
      data: tasks,
    });

  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
export const getTaskById = async (req, res) => {
  try {
    const { id } = req.params;

    const filter =
      req.user.role === "admin"
        ? {
            _id: id,
            isDeleted: false,
          }
        : {
            _id: id,
            assignedTo: req.user._id,
            isDeleted: false,
          };

    const task = await Task.findOne(filter)
      .populate("assignedTo", "firstName lastName email role")
      .populate("createdBy", "firstName lastName email")
      .populate("lead", "title leadCode status")
      .populate("company", "companyName companyCode")
      .populate("contact", "firstName lastName email phone contactCode")
      .populate("deal", "title dealCode stage value");

    if (!task) {
      return res.status(404).json({
        success: false,
        message: "Task not found.",
      });
    }

    return res.status(200).json({
      success: true,
      data: task,
    });

  } catch (error) {

    return res.status(500).json({
      success: false,
      message: error.message,
    });

  }
};

export const updateTask = async (req, res) => {
  try {
    const { error } = updateTaskValidation.validate(req.body);

    if (error) {
      return res.status(400).json({
        success: false,
        message: error.details[0].message,
      });
    }

    const { id } = req.params;

    const filter =
      req.user.role === "admin"
        ? {
            _id: id,
            isDeleted: false,
          }
        : {
            _id: id,
            assignedTo: req.user._id,
            isDeleted: false,
          };

    const task = await Task.findOne(filter);

    if (!task) {
      return res.status(404).json({
        success: false,
        message: "Task not found.",
      });
    }

    const {
      assignedTo,
      lead,
      company,
      contact,
      deal,
      status,
    } = req.body;

    // Validate Assigned User
    if (assignedTo) {
      const user = await User.findById(assignedTo);

      if (!user) {
        return res.status(404).json({
          success: false,
          message: "Assigned user not found.",
        });
      }
    }

    // Validate Lead
    if (lead) {
      const leadExists = await Lead.findById(lead);

      if (!leadExists) {
        return res.status(404).json({
          success: false,
          message: "Lead not found.",
        });
      }
    }

    // Validate Company
    if (company) {
      const companyExists = await Company.findById(company);

      if (!companyExists) {
        return res.status(404).json({
          success: false,
          message: "Company not found.",
        });
      }
    }

    // Validate Contact
    if (contact) {
      const contactExists = await Contact.findById(contact);

      if (!contactExists) {
        return res.status(404).json({
          success: false,
          message: "Contact not found.",
        });
      }
    }

    // Validate Deal
    if (deal) {
      const dealExists = await Deal.findById(deal);

      if (!dealExists) {
        return res.status(404).json({
          success: false,
          message: "Deal not found.",
        });
      }
    }

    // Update fields
    Object.assign(task, req.body);

    // Automatically set completedAt
    if (status === "completed") {
      task.completedAt = new Date();
    }

    await task.save();

    const updatedTask = await Task.findById(task._id)
      .populate("assignedTo", "firstName lastName email")
      .populate("createdBy", "firstName lastName email")
      .populate("lead", "title leadCode")
      .populate("company", "companyName companyCode")
      .populate("contact", "firstName lastName contactCode")
      .populate("deal", "title dealCode");

    return res.status(200).json({
      success: true,
      message: "Task updated successfully.",
      data: updatedTask,
    });

  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};