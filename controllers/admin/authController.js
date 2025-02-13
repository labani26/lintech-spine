const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const Admin = require("../../models/admin/User");

// Admin Sign-Up
exports.adminSignUp = async (req, res) => {
    const { name, email, password } = req.body;

    try {
        // Check if the admin already exists
        const adminExists = await Admin.findOne({ email });
        if (adminExists) {
            return res.status(400).json({ success: false, message: "Admin already exists" });
        }

        // Hash the password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Create a new admin user
        const newAdmin = new Admin({
            name,
            email,
            password: hashedPassword
        });

        // Save the admin user
        await newAdmin.save();
        res.status(201).json({ success: true, message: "Admin registered successfully" });
    } catch (error) {
        res.status(500).json({ success: false, message: "Server error", error: error.message });
    }
};

// Admin Login
exports.adminLogin = async (req, res) => {
    const { email, password } = req.body;

    try {
        // Check if the admin exists
        const admin = await Admin.findOne({ email });
        if (!admin) {
            return res.status(400).json({ success: false, message: "Admin not found" });
        }

        // Check if the password is correct
        const isMatch = await bcrypt.compare(password, admin.password);
        if (!isMatch) {
            return res.status(400).json({ success: false, message: "Invalid credentials" });
        }

        // Generate JWT Token
        const token = jwt.sign({ id: admin._id, role: admin.role }, process.env.JWT_SECRET, {
            expiresIn: "1h"
        });

        res.status(200).json({
            success: true,
            message: "Login successful",
            token
        });
    } catch (error) {
        res.status(500).json({ success: false, message: "Server error", error: error.message });
    }
};

// Admin Logout
exports.adminLogout = (req, res) => {
    // In JWT, logout is client-side, so here we just respond with success
    res.status(200).json({ success: true, message: "Logout successful" });
};