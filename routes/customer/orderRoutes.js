const express = require('express');
const { createCart, createOrderOne } = require('../../controllers/customer/orderController');
const router = express.Router();
const authMiddleware = require("../../middlewares/authMiddleware");


router.post("/addToCart",authMiddleware.authenticateToken, createCart);
router.post("/orderOne", authMiddleware.authenticateToken, createOrderOne )

module.exports = router;