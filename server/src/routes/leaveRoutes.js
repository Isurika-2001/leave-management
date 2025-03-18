const express = require("express");
const authMiddleware = require("../middlewares/authMiddleware");
const roleMiddleware = require("../middlewares/roleMiddleware");
const { 
  createLeaveRequest,
  getLeaveRequestById,
  getLeaveHistory,
  exportApprovedLeaves
} = require("../controllers/leaveController");
const { 
  approveLeaveRequest,
  declineLeaveRequest,
} = require("../controllers/leaveManagementController");
const router = express.Router();

// Routes for leave requests
router.post("/request", authMiddleware, createLeaveRequest); // Employees can request leave
router.get("/leave-request/:id", authMiddleware, getLeaveRequestById); 
router.put("/approve/:id", authMiddleware, roleMiddleware(["supervisor", "admin"]), approveLeaveRequest); // Supervisors and Admin can approve leave
router.put("/decline/:id", authMiddleware, roleMiddleware(["supervisor", "admin"]), declineLeaveRequest); // Supervisors and Admin can decline leave
router.get("/history", authMiddleware, getLeaveHistory); // View leave history (depends on role)
router.get("/export", authMiddleware, roleMiddleware(["admin", "superAdmin"]), exportApprovedLeaves); // Admin and SuperAdmin can export leave history

module.exports = router;
