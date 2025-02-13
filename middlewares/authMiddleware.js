const jwt = require("jsonwebtoken");
const Admin = require("../models/admin/User");

// Middleware to verify JWT token
exports.verifyAdmin = async (req, res, next) => {
    const token = req.headers.authorization?.split(" ")[1];

    if (!token) {
        return res.status(401).json({ success: false, message: "No token provided" });
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const admin = await Admin.findById(decoded.id);

        if (!admin) {
            return res.status(404).json({ success: false, message: "Admin not found" });
        }

        req.admin = admin;  // Attach admin to the request
        next();
    } catch (error) {
        res.status(401).json({ success: false, message: "Invalid token" });
    }
};

const Seller = require("../models/seller/User");

// Middleware to verify JWT token
exports.verifySeller = async (req, res, next) => {
    try {
        const token = req.headers.authorization?.split(" ")[1]; // Extract token from Authorization header
        if (!token) return res.status(401).json({ success: false, message: "Access Denied. No token provided." });

        const decoded = jwt.verify(token, process.env.JWT_SECRET); // Decode the token
        const seller = await Seller.findById(decoded.id); // Find the seller by ID from the decoded token

        if (!seller) {
            return res.status(404).json({ success: false, message: "Seller not found" });
        }

        req.user = seller; // Attach seller to the request object
        next(); // Pass control to the next middleware
    } catch (error) {
        res.status(401).json({ success: false, message: "Invalid token", error: error.message });
    }
};

exports.authenticateToken = (req, res, next) => {
    const token = req.headers.authorization?.split(" ")[1];
    if (!token) return res.status(401).json({ error: 'Access denied' });

    jwt.verify(token, process.env.CUST_SECRET, (err, user) => {
        if (err) return res.status(403).json({ error: 'Invalid token' });
        req.user = user;
        next();
    });
};