const User = require("../models/User");

// Get all users (admin only)
exports.getAllUsers = async (req, res) => {
  try {
    const users = await User.find();
    res.json(users);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get user by ID
exports.getUserById = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) return res.status(404).json({ message: "User not found" });
    res.json(user);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Update user leave quota (admin only)
exports.updateLeaveQuota = async (req, res) => {
  try {
    const { sick, annual, casual, noPay, liue } = req.body;
    const user = await User.findById(req.params.id);

    if (!user) return res.status(404).json({ message: "User not found" });

    user.leaveQuota = { sick, annual, casual, noPay, liue };
    await user.save();

    res.json({ message: "Leave quota updated successfully", user });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
