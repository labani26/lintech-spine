const mongoose = require("mongoose");

const sellerSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true
        },
        email: {
            type: String,
            required: true,
            unique: true
        },
        phoneNumber: {
            type: String,
            required: true
        },
        businessName: {
            type: String,
            required: true
        },
        shopName: {
            type: String,
            required: true
        },
        address: [{
            city: String,
            state: String,
            pincode: String,
            additionalDetails: {
                type: String,
                default: ""
            }
        }],
        shopAddress: [{
            city: String,
            state: String,
            pincode: String,
            additionalDetails: {
                type: String,
                default: ""
            }
        }],
        businessRegistrationNumber: {
            type: String,
            required: true
        },
        gstNumber: {
            type: String,
            required: true
        },
        password: {
            type: String,
            required: true
        },
        role: {
            type: String,
            default: "seller"
        }
    },
    { timestamps: true }
);

module.exports = mongoose.model("Seller", sellerSchema);