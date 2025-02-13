const express = require("express");
const {
    adminSignUp,
    adminLogin,
    adminLogout
} = require("../../controllers/admin/authController");

const router = express.Router();

// Admin Sign-Up Route
router.post("/signup", adminSignUp);

// Admin Login Route
router.post("/login", adminLogin);

// Admin Logout Route
router.post("/logout", adminLogout);

module.exports = router;