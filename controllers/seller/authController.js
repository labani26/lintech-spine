const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const Seller = require("../../models/seller/User");

// Seller Sign-Up
exports.sellerSignUp = async (req, res) => {
    const {
        name,
        email,
        phoneNumber,
        businessName,
        shopName,
        address,
        shopAddress,
        businessRegistrationNumber,
        gstNumber,
        password
    } = req.body;

    try {
        // Check if the seller already exists
        const sellerExists = await Seller.findOne({ email });
        if (sellerExists) {
            return res.status(400).json({ success: false, message: "Seller already exists" });
        }

        // Hash the password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Create a new seller user
        const newSeller = new Seller({
            name,
            email,
            phoneNumber,
            businessName,
            shopName,
            address,
            shopAddress,
            businessRegistrationNumber,
            gstNumber,
            password: hashedPassword
        });

        // Save the seller user
        await newSeller.save();
        res.status(201).json({ success: true, message: "Seller registered successfully" });
    } catch (error) {
        res.status(500).json({ success: false, message: "Server error", error: error.message });
    }
};

// Seller Sign-In
exports.sellerSignIn = async (req, res) => {
    const { email, phoneNumber, businessRegistrationNumber, password } = req.body;

    try {
        // Check if any of the combinations are provided (email, phone, or businessRegistrationNumber)
        let seller;
        if (email) {
            seller = await Seller.findOne({ email });
        } else if (phoneNumber) {
            seller = await Seller.findOne({ phoneNumber });
        } else if (businessRegistrationNumber) {
            seller = await Seller.findOne({ businessRegistrationNumber });
        }

        if (!seller) {
            return res.status(400).json({ success: false, message: "Seller not found" });
        }

        // Check if the password is correct
        const isMatch = await bcrypt.compare(password, seller.password);
        if (!isMatch) {
            return res.status(400).json({ success: false, message: "Invalid credentials" });
        }

        // Generate JWT Token
        const token = jwt.sign({ id: seller._id, role: seller.role }, process.env.JWT_SECRET, {
            expiresIn: "1h"
        });

        res.status(200).json({
            success: true,
            message: "Sign-In successful",
            token
        });
    } catch (error) {
        res.status(500).json({ success: false, message: "Server error", error: error.message });
    }
};


// Seller Sign-Out
exports.sellerSignOut = (req, res) => {
    res.status(200).json({ success: true, message: "Sign-Out successful" });
};