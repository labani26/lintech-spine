const mongoose = require("mongoose");

const customerSchema = new mongoose.Schema(
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
        phone: {
            type: String,
            required: true
        },
        address: [{
            city: String,
            state: String,
            pincode: String,
            street: String,
            locality: String,
            status: {
                type: String,
                default: "active"
            }
        }],
        password: {
            type: String,
            required: true
        },
        role: {
            type: String,
            default: "customer"
        },

    },
    { timestamps: true }
)

module.exports = mongoose.model("Customer", customerSchema);