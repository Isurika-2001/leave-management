const LeaveRequest = require("../models/LeaveRequest");
const User = require("../models/User");
const Department = require("../models/Depatment");

// Create leave request
exports.createLeaveRequest = async (req, res) => {
  try {
    const { leaveType, startDate, endDate, reason } = req.body;
    const employee = await User.findById(req.user.id);

    if (!employee) return res.status(404).json({ message: "User not found" });

    // Check leave balance
    const leaveBalance = employee.leaveQuota[leaveType] - employee.leavesTaken[leaveType];
    if (leaveBalance <= 0) return res.status(400).json({ message: "Insufficient leave balance" });

    // Assign department supervisor
    const department = await Department.findOne({ name: employee.department });
    if (!department) return res.status(404).json({ message: "Department not found" });

    const leaveRequest = new LeaveRequest({
      employee: req.user.id,
      department: employee.department,
      leaveType,
      startDate,
      endDate,
      reason,
      supervisor: department.supervisor,
    });

    await leaveRequest.save();
    res.status(201).json({ message: "Leave request submitted successfully", leaveRequest });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get leave request by ID (admin/supervisor only)
exports.getLeaveRequestById = async (req, res) => {
  try {
    const leaveRequest = await LeaveRequest.findById(req.params.id)
      .populate("employee", "name email")
      .populate("supervisor", "name email");

    if (!leaveRequest) return res.status(404).json({ message: "Leave request not found" });
    res.json(leaveRequest);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get leave history for the user (employee, supervisor, or admin)
exports.getLeaveHistory = async (req, res) => {
  try {
    const filter = {};
    if (req.user.role === "user") {
      filter.employee = req.user.id;
    } else if (req.user.role === "supervisor") {
      const department = await Department.findOne({ supervisor: req.user.id });
      if (!department) return res.status(404).json({ message: "Department not found" });
      filter.department = department.name;
    } else if (req.user.role === "admin") {
      // All leave requests
    } else {
      return res.status(403).json({ message: "Forbidden" });
    }

    const leaveHistory = await LeaveRequest.find(filter).populate("employee", "name email");
    res.json(leaveHistory);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Export approved leaves as CSV
exports.exportApprovedLeaves = async (req, res) => {
  try {
    const leaveHistory = await LeaveRequest.find({ status: "Approved" }).populate("employee", "name email");
    const csv = require("csv-express");
    
    res.setHeader("Content-Type", "text/csv");
    res.setHeader("Content-Disposition", "attachment; filename=approved_leaves.csv");
    
    res.csv(leaveHistory, true);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
