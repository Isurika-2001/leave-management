const Department = require("../models/Depatment");
const User = require("../models/User");

// Get all departments
exports.getDepartments = async (req, res) => {
  try {
    const departments = await Department.find().populate("supervisor", "name email");
    res.json(departments);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Assign supervisor to a department (admin only)
exports.assignSupervisor = async (req, res) => {
  try {
    const { departmentName, supervisorId } = req.body;

    const department = await Department.findOne({ name: departmentName });
    if (!department) return res.status(404).json({ message: "Department not found" });

    const supervisor = await User.findById(supervisorId);
    if (!supervisor || supervisor.role !== "supervisor") {
      return res.status(404).json({ message: "Supervisor not found" });
    }

    department.supervisor = supervisor._id;
    await department.save();

    res.json({ message: "Supervisor assigned successfully", department });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Create a new department (admin only)
exports.createDepartment = async (req, res) => {
  try {
    const { name, description } = req.body; // You can add other fields as needed

    // Check if the department already exists
    const existingDepartment = await Department.findOne({ name });
    if (existingDepartment) {
      return res.status(400).json({ message: "Department already exists" });
    }

    // Create a new department
    const newDepartment = new Department({
      name,
      description, // Optional field
    });

    // Save the department to the database
    await newDepartment.save();

    // Respond with the created department
    res.status(201).json({
      message: "Department created successfully",
      department: newDepartment,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
