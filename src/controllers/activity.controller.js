import Activity from "../models/Activity.js";

export const getActivities = async (req, res) => {
  try {
    const page = Number(req.query.page) || 1;
    const limit = Number(req.query.limit) || 20;
    const skip = (page - 1) * limit;

    const { module, action } = req.query;

    const filter = {};

    if (module) {
      filter.module = module;
    }

    if (action) {
      filter.action = action;
    }

    const total = await Activity.countDocuments(filter);

    const activities = await Activity.find(filter)
      .populate("performedBy", "firstName lastName email")
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit);

    return res.status(200).json({
      success: true,
      total,
      page,
      pages: Math.ceil(total / limit),
      data: activities,
    });

  } catch (error) {

    return res.status(500).json({
      success: false,
      message: error.message,
    });

  }
};

export const getActivityTimeline = async (req, res) => {
  try {

    const { module, entityId } = req.params;

    const activities = await Activity.find({
      module,
      entityId,
    })
      .populate("performedBy", "firstName lastName email")
      .sort({ createdAt: -1 });

    return res.status(200).json({
      success: true,
      total: activities.length,
      data: activities,
    });

  } catch (error) {

    return res.status(500).json({
      success: false,
      message: error.message,
    });

  }
};