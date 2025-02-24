const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
    name: { type: String, required: true },
    modelNumber: { type: String, required: true },
    image: { type: String, required: true},
    vendor: { type: String, required: true },
    category: { type: String, required: true },
    price: { type: Number, required: true },
    details: { type: String, required: true },
    quantity: { type: Number, default: 0 },
    sellerId: { type: mongoose.Schema.Types.ObjectId, ref: "Seller", required: true },
}, { timestamps: true });

const Product = mongoose.model("Product", productSchema);

module.exports = Product;