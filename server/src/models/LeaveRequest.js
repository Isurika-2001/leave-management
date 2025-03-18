const mongoose = require("mongoose");

const leaveRequestSchema = new mongoose.Schema({
  employee: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  department: { type: String, enum: ["Marketing", "Academic"], required: true },
  leaveType: { type: String, enum: ["liue", "sick", "annual", "casual", "noPay"], required: true },
  startDate: { type: Date, required: true },
  endDate: { type: Date, required: true },
  reason: { type: String, required: true, trim: true },
  status: { type: String, enum: ["Pending", "Approved", "Declined"], default: "Pending" },
  supervisor: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  admin: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now }
}, { timestamps: true });

leaveRequestSchema.index({ employee: 1, status: 1, createdAt: -1 });

leaveRequestSchema.pre("save", function(next) {
  if (this.endDate < this.startDate) {
    return next(new Error("End date cannot be before start date"));
  }
  next();
});

module.exports = mongoose.model("LeaveRequest", leaveRequestSchema);
