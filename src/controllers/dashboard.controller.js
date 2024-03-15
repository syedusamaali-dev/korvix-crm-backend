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

    res.status(200).json({
      success: true,
      data: {
        totalCustomers,
        totalCompanies,
        totalContacts,
        totalLeads,
        totalDeals,
      },
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};