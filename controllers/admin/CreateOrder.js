const express = require('express');
const bcrypt = require('bcrypt');
const shopOrder = require('../../models/admin/ShopOrder');
const Customer = require("../../models/customer/User");
exports.ShopOrderNow = async (req, res) => {
    const { productId, customerName, customerEmail, customerPhone, quantity, price, paymentStatus, address, orderStatus } = req.body;
    const orderId = `LINTECH-${Date.now()}`;
    const orderDate = new Date();
    const estimatedDeliveryDate = new Date(orderDate.setDate(orderDate.getDate() + 5));
    const warrantyTill = new Date(orderDate.setDate(orderDate.getDate() + 365));
    const hashedPassword = await bcrypt.hash("customer", 10);
    try {
        const newOrder = new shopOrder({
            productId,
            customerName,
            customerEmail,
            customerPhone, 
            quantity, 
            price, 
            paymentStatus,
            address,
            orderStatus,
            orderId,
            estimatedDeliveryDate,
            warrantyTill
        });
        const name = customerName;
        const phone = customerPhone;
        const email = customerEmail;
        const newCustomer = new Customer({
            name,
            email,
            phone,
            address,
            password: hashedPassword
        });
        await newOrder.save();
        await newCustomer.save();
        res.status(201).json(newOrder);
    } catch (e) {
        console.log(e);
        res.status(500).json({ error: error, message: "Error creating order", error });
    }
} 