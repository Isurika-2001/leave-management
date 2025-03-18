const mongoose = require("mongoose");

const leaveApprovalSchema = new mongoose.Schema({
    leaveRequest: { type: mongoose.Schema.Types.ObjectId, ref: "LeaveRequest", required: true },
    approvedBy: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    status: { type: String, enum: ["Approved", "Declined"], required: true },
    remarks: { type: String, trim: true },
    createdAt: { type: Date, default: Date.now }
  }, { timestamps: true });
  
  leaveApprovalSchema.index({ leaveRequest: 1 });
  
  module.exports = mongoose.model("LeaveApproval", leaveApprovalSchema);
  