const mongoose = require("mongoose");

const cartSchema = new mongoose.Schema(
    {
        customerId: {
            type: String,
            required: true
        },
        productIds: [String]
    },
    { timestamps: true }
);

module.exports = mongoose.model("Cart", cartSchema);