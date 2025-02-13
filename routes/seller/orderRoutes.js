const express = require("express");
const { addProduct, updateProduct, deleteProduct } = require("../../controllers/seller/productController");
const authMiddleware = require("../../middlewares/authMiddleware");

const router = express.Router();

// Route to add a new product
router.post("/product", authMiddleware.verifySeller, addProduct);

// Route to update a product
router.put("/product/:id", authMiddleware.verifySeller, updateProduct);

// Route to delete a product
router.delete("/product/:id", authMiddleware.verifySeller, deleteProduct);

module.exports = router;