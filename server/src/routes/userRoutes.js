const express = require("express");
const authMiddleware = require("../middlewares/authMiddleware");
const roleMiddleware = require("../middlewares/roleMiddleware");
const { getAllUsers , getUserById, updateLeaveQuota} = require("../controllers/userController");
const router = express.Router();

// Routes for user to view and update their profile
router.get("/", authMiddleware, getAllUsers);
router.put("/profile", authMiddleware, getUserById);
router.put("/update-leave/quota/:id", authMiddleware, updateLeaveQuota);

module.exports = router;
