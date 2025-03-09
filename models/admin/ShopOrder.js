const mongoose = require("mongoose");

const shopOrderSchema = new mongoose.Schema({
  productId: { type: mongoose.Schema.Types.ObjectId, required: true, ref: 'Product' },
  customerName: { type: String, required: true },
  customerEmail: { type: String, required: true },
  customerPhone: { type: String, required: true },
  quantity: { type: Number, required: true },
  price: { type: Number, required: true },
  paymentStatus: { type: String, enum: ['Pending', 'Completed', 'Failed'], default: 'Pending' },
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
  orderStatus: { type: String, enum: ['Pending', 'Shipped', 'Delivered', 'Canceled'], default: 'Pending' },
  returnable: { type: Boolean, default: true },
  warrantyTill: {type: String, required: true},
  returnRequested: { type: Boolean, default: false },
  returnStatus: { type: String, enum: ['Not Requested', 'Approved', 'Rejected'], default: 'Not Requested' },
  refundable: { type: Boolean, default: false },
  refundStatus: { type: String, enum: ['Not Initiated', 'Approved', 'Rejected'], default: 'Not Initiated' },
  orderId: { type: String, required: true, unique: true }
}, { timestamps: true });

module.exports = mongoose.model('ShopOrder', shopOrderSchema);