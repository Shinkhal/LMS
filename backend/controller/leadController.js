import Lead from "../models/Leads.js";

// @desc Create new lead
// @route POST /api/leads
export const createLead = async (req, res) => {
  try {
    const lead = await Lead.create({
      ...req.body,
      user: req.user.id, // 👈 tie lead to logged-in user
    });
    res.status(201).json(lead);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

// @desc Get all leads (with pagination & filters later)
// @route GET /api/leads
// @desc Get all leads (with pagination & filters)
// @route GET /api/leads
export const getLeads = async (req, res) => {
  try {
    const { page = 1, limit = 20, ...filters } = req.query;

    const query = { user: req.user.id };

    // 🔹 String filters (contains)
    if (filters.email) query.email = { $regex: filters.email, $options: "i" };
    if (filters.company) query.company = { $regex: filters.company, $options: "i" };
    if (filters.city) query.city = { $regex: filters.city, $options: "i" };

    // 🔹 Enum filters (equals / in)
    if (filters.status) query.status = filters.status;
    if (filters.source) query.source = filters.source;

    // 🔹 Number filters
    if (filters.score) query.score = Number(filters.score);
    if (filters.score_gt) query.score = { ...query.score, $gt: Number(filters.score_gt) };
    if (filters.score_lt) query.score = { ...query.score, $lt: Number(filters.score_lt) };
    if (filters.lead_value) query.lead_value = Number(filters.lead_value);
    if (filters.lead_value_gt) query.lead_value = { ...query.lead_value, $gt: Number(filters.lead_value_gt) };
    if (filters.lead_value_lt) query.lead_value = { ...query.lead_value, $lt: Number(filters.lead_value_lt) };

    // 🔹 Boolean filter
    if (filters.is_qualified !== undefined) {
      query.is_qualified = filters.is_qualified === "true";
    }

    // 🔹 Date filters
    if (filters.created_before || filters.created_after) {
      query.createdAt = {};
      if (filters.created_before) query.createdAt.$lte = new Date(filters.created_before);
      if (filters.created_after) query.createdAt.$gte = new Date(filters.created_after);
    }
    if (filters.last_activity_before || filters.last_activity_after) {
      query.last_activity_at = {};
      if (filters.last_activity_before) query.last_activity_at.$lte = new Date(filters.last_activity_before);
      if (filters.last_activity_after) query.last_activity_at.$gte = new Date(filters.last_activity_after);
    }

    // 🔹 Run query with pagination
    const leads = await Lead.find(query)
      .skip((page - 1) * limit)
      .limit(Number(limit));

    const total = await Lead.countDocuments(query);

    res.json({
      data: leads,
      page: Number(page),
      limit: Number(limit),
      total,
      totalPages: Math.ceil(total / limit),
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};


// @desc Get single lead
// @route GET /api/leads/:id
export const getLeadById = async (req, res) => {
  try {
    const lead = await Lead.findOne({
      _id: req.params.id,
      user: req.user.id, // 👈 restrict to owner
    });
    if (!lead) return res.status(404).json({ message: "Lead not found" });
    res.json(lead);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// @desc Update lead
// @route PUT /api/leads/:id
export const updateLead = async (req, res) => {
  try {
    const lead = await Lead.findOneAndUpdate(
      { _id: req.params.id, user: req.user.id }, // 👈 restrict to owner
      req.body,
      { new: true, runValidators: true }
    );
    if (!lead) return res.status(404).json({ message: "Lead not found" });
    res.json(lead);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

// @desc Delete lead
// @route DELETE /api/leads/:id
export const deleteLead = async (req, res) => {
  try {
    const lead = await Lead.findOneAndDelete({
      _id: req.params.id,
      user: req.user.id, // 👈 restrict to owner
    });
    if (!lead) return res.status(404).json({ message: "Lead not found" });
    res.json({ message: "Lead deleted successfully" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
