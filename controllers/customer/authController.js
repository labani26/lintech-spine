const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const Customer = require("../../models/customer/User");

//Customer sign-up
exports.customerSignUp = async (req, res) => {
    const {
        name,
        email,
        phone,
        address,
        password
    } = req.body;

    try {
        const customerExists = await Customer.findOne({ email });
        if (customerExists) {
            return res.status(400).json({ success: false, message: "Customer already exists" });
        }
        const hashedPassword = await bcrypt.hash(password, 10);
        const newCustomer = new Customer({
            name,
            email,
            phone,
            address,
            password: hashedPassword
        });
        await newCustomer.save();
        res.status(201).json({ success: true, message: "Customer registered succesfully" });
    } catch (error) {
        res.status(500).json({ success: false, message: "Server error", error: error.message })
    }
}

// Customer Sign-In

exports.customerSignIn = async (req, res) => {
    const { email, password } = req.body;
    try {
        let customer;
        if (email) {
            customer = await Customer.findOne({ email });
        }
        if (!customer) {
            return res.status(400).json({ success: false, message: "Customer not found" });
        }
        const isMatch = await bcrypt.compare(password, customer.password);
        if (!isMatch) {
            return res.status(400).json({ success: false, message: "Invalid credentials" });
        }
        const token = jwt.sign({ id: customer._id, role: customer.role, address: customer.address }, process.env.CUST_SECRET, {
            expiresIn: "1h"
        });

        res.status(200).json({
            success: true,
            message: "Sign-In successfull",
            token
        })
    } catch (error) {
        res.status(500).json({ success: false, message: "Server error", error: error.message });
    }
};