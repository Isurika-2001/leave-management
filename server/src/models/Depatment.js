const mongoose = require("mongoose");

const departmentSchema = new mongoose.Schema({
    name: { type: String, enum: ["Marketing", "Academic"], required: true, unique: true },
    supervisor: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true }
  });
  
  departmentSchema.index({ name: 1 });
  
  module.exports = mongoose.model("Department", departmentSchema);
  