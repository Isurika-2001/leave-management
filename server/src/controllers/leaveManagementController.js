const LeaveRequest = require("../models/LeaveRequest");
const LeaveApproval = require("../models/LeaveApproval");
const User = require("../models/User");

// Approve or decline leave request (supervisor/admin)
exports.approveLeaveRequest = async (req, res) => {
  try {
    const leaveRequest = await LeaveRequest.findById(req.params.id);
    if (!leaveRequest) return res.status(404).json({ message: "Leave request not found" });

    const user = await User.findById(req.user.id);

    // Only supervisor/admin can approve/decline
    if (leaveRequest.supervisor.toString() !== user._id.toString() && user.role !== "admin") {
      return res.status(403).json({ message: "You are not authorized to approve this request" });
    }

    leaveRequest.status = req.body.status;
    leaveRequest.updatedAt = Date.now();

    const approval = new LeaveApproval({
      leaveRequest: leaveRequest._id,
      approvedBy: req.user.id,
      status: req.body.status,
      remarks: req.body.remarks,
    });

    await leaveRequest.save();
    await approval.save();

    if (leaveRequest.status === "Approved") {
      // Update user leave balance
      const employee = await User.findById(leaveRequest.employee);
      employee.leavesTaken[leaveRequest.leaveType] += (leaveRequest.endDate - leaveRequest.startDate) / (1000 * 3600 * 24) + 1;
      await employee.save();
    }

    res.json({ message: "Leave request updated successfully", leaveRequest });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Decline leave request (supervisor/admin)
exports.declineLeaveRequest = async (req, res) => {
  try {
    // Find the leave request by ID
    const leaveRequest = await LeaveRequest.findById(req.params.id);
    if (!leaveRequest) return res.status(404).json({ message: "Leave request not found" });

    // Find the user who is making the request (supervisor or admin)
    const user = await User.findById(req.user.id);

    // Only supervisor or admin can approve/decline
    if (leaveRequest.supervisor.toString() !== user._id.toString() && user.role !== "admin") {
      return res.status(403).json({ message: "You are not authorized to decline this request" });
    }

    // Set the leave request status to "Declined"
    leaveRequest.status = "Declined";
    leaveRequest.updatedAt = Date.now();

    // Create a new approval record with status "Declined"
    const approval = new LeaveApproval({
      leaveRequest: leaveRequest._id,
      approvedBy: req.user.id,
      status: "Declined",
      remarks: req.body.remarks, // Optional remarks for the decline
    });

    // Save the leave request and approval
    await leaveRequest.save();
    await approval.save();

    // Send response to the client
    res.json({ message: "Leave request declined successfully", leaveRequest });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
