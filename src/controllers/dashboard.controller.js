import Customer from "../models/Customer.js";
import Company from "../models/Company.js";
import Contact from "../models/Contact.js";
import Lead from "../models/Lead.js";
import Deal from "../models/Deal.js";

export const getDashboardOverview = async (req, res) => {
  try {
    const filter =
      req.user.role === "admin"
        ? { isDeleted: false }
        : {
            owner: req.user._id,
            isDeleted: false,
          };

    const [
      totalCustomers,
      totalCompanies,
      totalContacts,
      totalLeads,
      totalDeals,
    ] = await Promise.all([
      Customer.countDocuments(filter),
      Company.countDocuments(filter),
      Contact.countDocuments(filter),
      Lead.countDocuments(filter),
      Deal.countDocuments(filter),
    ]);

    // Pipeline Value
    const pipelineResult = await Deal.aggregate([
      {
        $match:
          req.user.role === "admin"
            ? { isDeleted: false }
            : {
                owner: req.user._id,
                isDeleted: false,
              },
      },
      {
        $group: {
          _id: null,
          totalPipelineValue: {
            $sum: "$value",
          },
        },
      },
    ]);

    const pipelineValue =
      pipelineResult.length > 0 ? pipelineResult[0].totalPipelineValue : 0;

    // Won Revenue
    const wonRevenueResult = await Deal.aggregate([
      {
        $match:
          req.user.role === "admin"
            ? {
                isDeleted: false,
                stage: "closed-won",
              }
            : {
                owner: req.user._id,
                isDeleted: false,
                stage: "closed-won",
              },
      },
      {
        $group: {
          _id: null,
          totalWonRevenue: {
            $sum: "$value",
          },
        },
      },
    ]);

    const wonRevenue =
      wonRevenueResult.length > 0 ? wonRevenueResult[0].totalWonRevenue : 0;

    const averageDealResult = await Deal.aggregate([
      {
        $match:
          req.user.role === "admin"
            ? {
                isDeleted: false,
              }
            : {
                owner: req.user._id,
                isDeleted: false,
              },
      },
      {
        $group: {
          _id: null,
          averageDealSize: {
            $avg: "$value",
          },
        },
      },
    ]);

    const averageDealSize =
      averageDealResult.length > 0 ? averageDealResult[0].averageDealSize : 0;

    const convertedLeads = await Lead.countDocuments({
      ...(req.user.role === "admin" ? {} : { owner: req.user._id }),
      isDeleted: false,
      converted: true,
    });

    const conversionRate =
      totalLeads > 0
        ? Number(((convertedLeads / totalLeads) * 100).toFixed(2))
        : 0;

    res.status(200).json({
      success: true,
      data: {
        totalCustomers,
        totalCompanies,
        totalContacts,
        totalLeads,
        totalDeals,

        pipelineValue,
        wonRevenue,
        averageDealSize,

        convertedLeads,
        conversionRate,
      },
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export const getLeadsByStatus = async (req, res) => {
  try {

    const filter =
      req.user.role === "admin"
        ? {
            isDeleted: false,
          }
        : {
            owner: req.user._id,
            isDeleted: false,
          };

    const result = await Lead.aggregate([
      {
        $match: filter,
      },
      {
        $group: {
          _id: "$status",
          total: {
            $sum: 1,
          },
        },
      },
      {
        $sort: {
          _id: 1,
        },
      },
    ]);

    res.status(200).json({
      success: true,
      data: result,
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export const getDealsByStage = async (req, res) => {
  try {
    const filter =
      req.user.role === "admin"
        ? { isDeleted: false }
        : {
            owner: req.user._id,
            isDeleted: false,
          };

    const result = await Deal.aggregate([
      {
        $match: filter,
      },
      {
        $group: {
          _id: "$stage",
          total: {
            $sum: 1,
          },
        },
      },
      {
        $project: {
          _id: 0,
          stage: "$_id",
          total: 1,
        },
      },
      {
        $sort: {
          stage: 1,
        },
      },
    ]);

    res.status(200).json({
      success: true,
      data: result,
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export const getMonthlyRevenue = async (req, res) => {
  try {

    const filter =
      req.user.role === "admin"
        ? {
            isDeleted: false,
            stage: "closed-won",
          }
        : {
            owner: req.user._id,
            isDeleted: false,
            stage: "closed-won",
          };

    const result = await Deal.aggregate([
      {
        $match: filter,
      },
      {
        $group: {
          _id: {
            $dateToString: {
              format: "%Y-%m",
              date: "$createdAt",
            },
          },
          revenue: {
            $sum: "$value",
          },
        },
      },
      {
        $project: {
          _id: 0,
          month: "$_id",
          revenue: 1,
        },
      },
      {
        $sort: {
          month: 1,
        },
      },
    ]);

    res.status(200).json({
      success: true,
      data: result,
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};


export const getMonthlyLeads = async (req, res) => {
  try {

    const filter =
      req.user.role === "admin"
        ? { isDeleted: false }
        : {
            owner: req.user._id,
            isDeleted: false,
          };

    const result = await Lead.aggregate([
      {
        $match: filter,
      },
      {
        $group: {
          _id: {
            $dateToString: {
              format: "%Y-%m",
              date: "$createdAt",
            },
          },
          total: {
            $sum: 1,
          },
        },
      },
      {
        $project: {
          _id: 0,
          month: "$_id",
          total: 1,
        },
      },
      {
        $sort: {
          month: 1,
        },
      },
    ]);

    res.status(200).json({
      success: true,
      data: result,
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export const getMonthlyDeals = async (req, res) => {
  try {

    const filter =
      req.user.role === "admin"
        ? { isDeleted: false }
        : {
            owner: req.user._id,
            isDeleted: false,
          };

    const result = await Deal.aggregate([
      {
        $match: filter,
      },
      {
        $group: {
          _id: {
            $dateToString: {
              format: "%Y-%m",
              date: "$createdAt",
            },
          },
          total: {
            $sum: 1,
          },
        },
      },
      {
        $project: {
          _id: 0,
          month: "$_id",
          total: 1,
        },
      },
      {
        $sort: {
          month: 1,
        },
      },
    ]);

    res.status(200).json({
      success: true,
      data: result,
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export const getRecentActivity = async (req, res) => {
  try {

    const filter =
      req.user.role === "admin"
        ? { isDeleted: false }
        : {
            owner: req.user._id,
            isDeleted: false,
          };

    const [customers, companies, contacts, leads, deals] =
      await Promise.all([
        Customer.find(filter)
          .sort({ createdAt: -1 })
          .limit(5),

        Company.find(filter)
          .sort({ createdAt: -1 })
          .limit(5),

        Contact.find(filter)
          .sort({ createdAt: -1 })
          .limit(5),

        Lead.find(filter)
          .sort({ createdAt: -1 })
          .limit(5),

        Deal.find(filter)
          .sort({ createdAt: -1 })
          .limit(5),
      ]);

    let activities = [];

    customers.forEach(item => {
      activities.push({
        type: "Customer",
        action: "Created",
        title: `${item.firstName} ${item.lastName}`,
        createdAt: item.createdAt,
      });
    });

    companies.forEach(item => {
      activities.push({
        type: "Company",
        action: "Created",
        title: item.companyName,
        createdAt: item.createdAt,
      });
    });

    contacts.forEach(item => {
      activities.push({
        type: "Contact",
        action: "Created",
        title: `${item.firstName} ${item.lastName}`,
        createdAt: item.createdAt,
      });
    });

    leads.forEach(item => {
      activities.push({
        type: "Lead",
        action: "Created",
        title: item.title,
        createdAt: item.createdAt,
      });
    });

    deals.forEach(item => {
      activities.push({
        type: "Deal",
        action: "Created",
        title: item.title,
        createdAt: item.createdAt,
      });
    });

    activities.sort(
      (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
    );

    activities = activities.slice(0, 15);

    res.status(200).json({
      success: true,
      data: activities,
    });

  } catch (error) {

    res.status(500).json({
      success: false,
      message: error.message,
    });

  }
};