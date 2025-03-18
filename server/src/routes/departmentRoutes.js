const express = require("express");
const { createDepartment, getDepartments, assignSupervisor } = require("../controllers/departmentController");
const authMiddleware = require("../middlewares/authMiddleware");
const roleMiddleware = require("../middlewares/roleMiddleware");
const router = express.Router();

// Routes for creating and getting department details (only admin and super admin can access)
router.post("/", authMiddleware, roleMiddleware(["admin", "superAdmin"]), createDepartment);
router.get("/", authMiddleware, roleMiddleware(["admin", "superAdmin"]), getDepartments);
router.get("/assign-supervisor", authMiddleware, roleMiddleware(["admin", "superAdmin"]), assignSupervisor);


module.exports = router;
