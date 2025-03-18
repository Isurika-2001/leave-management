const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  name: { type: String, required: true, trim: true },
  email: { type: String, unique: true, required: true, lowercase: true, trim: true },
  password: { type: String, required: true, minlength: 6 },
  department: { type: String, enum: ["Marketing", "Academic"], required: true },
  role: { type: String, enum: ["user", "supervisor", "admin", "superAdmin"], required: true },
  leaveQuota: {
    sick: { type: Number, default: 8, min: 0 },
    annual: { type: Number, default: 15, min: 0 },
    casual: { type: Number, default: 10, min: 0 },
    noPay: { type: Number, default: 0, min: 0 },
    liue: { type: Number, default: 5, min: 0 }
  },
  leavesTaken: {
    sick: { type: Number, default: 0, min: 0 },
    annual: { type: Number, default: 0, min: 0 },
    casual: { type: Number, default: 0, min: 0 },
    noPay: { type: Number, default: 0, min: 0 },
    liue: { type: Number, default: 0, min: 0 }
  },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now }
}, { timestamps: true });

userSchema.index({ email: 1 }); // Index for fast searches

module.exports = mongoose.model("User", userSchema);
