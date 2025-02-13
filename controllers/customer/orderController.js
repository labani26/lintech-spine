const express = require('express');
const Cart = require('../../models/customer/Cart')
const Order = require('../../models/customer/Order');

exports.createCart = async (req, res) => {
    try {
        const customerId = req.user.id;
        const { productIds } = req.body;

        if (!productIds || !Array.isArray(productIds)) {
            return res.status(400).json({ error: 'Invalid product IDs' });
        }
        let cart = await Cart.findOne({ customerId });

        if (cart) {
            cart.productIds.push(...productIds);
        } else {
            cart = new Cart({ customerId, productIds });
        }

        await cart.save();
        res.json({ message: 'Products added to cart', cart });


    } catch (error) {
        res.status(500).json({ success: false, message: "Server error", error: error.message });
    }
}

exports.createOrderOne = async (req, res) => {
    const { productId, quantity, price } = req.body;
    const customerId = req.user.id;  // Retrieved from JWT token
    const address = req.user.address; // Address stored in JWT token
    console.log(req.user)

    // Generate a random order ID for simplicity (you could use something more sophisticated)
    const orderId = `LINTECH-${Date.now()}`;
    const orderDate = new Date();
    const estimatedDeliveryDate = new Date(orderDate.setDate(orderDate.getDate() + 5));


    try {
        const newOrder = new Order({
            customerId,
            productId,
            quantity,
            price,
            address,
            estimatedDeliveryDate,
            orderId,
        });

        await newOrder.save();
        res.status(201).json(newOrder);
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: error, message: "Error creating order", error });
    }
};