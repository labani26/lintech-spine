const mongoose = require("mongoose");

const totalPriceSchema = new mongoose.Schema({
    sellerId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Seller", // Assuming Seller model exists
        required: true
    },
    totalPrice: {
        type: Number,
        default: 0
    }
}, { timestamps: true });

module.exports = mongoose.model("TotalPrice", totalPriceSchema);