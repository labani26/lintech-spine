const mongoose = require("mongoose");

const addressSchema = new mongoose.Schema({
  city: { type: String, required: true },
  state: { type: String, required: true },
  pincode: { type: String, required: true },
  street: { type: String, required: true },
  locality: { type: String, required: true },
  status: { type: String, default: "active" },
});

const orderSchema = new mongoose.Schema({
  customerId: { type: mongoose.Schema.Types.ObjectId, required: true, ref: 'Customer' },
  productId: { type: mongoose.Schema.Types.ObjectId, required: true, ref: 'Product' },
  quantity: { type: Number, required: true },
  price: { type: Number, required: true },
  paymentStatus: { type: String, enum: ['Pending', 'Completed', 'Failed'], default: 'Pending' },
  address: [addressSchema],  // Address now an array of address objects
  orderStatus: { type: String, enum: ['Pending', 'Shipped', 'Delivered', 'Canceled'], default: 'Pending' },
  estimatedDeliveryDate: { type: Date, required: true },
  returnable: { type: Boolean, default: true },
  returnRequested: { type: Boolean, default: false },
  returnStatus: { type: String, enum: ['Not Requested', 'Approved', 'Rejected'], default: 'Not Requested' },
  refundable: { type: Boolean, default: true },
  refundStatus: { type: String, enum: ['Not Initiated', 'Approved', 'Rejected'], default: 'Not Initiated' },
  orderId: { type: String, required: true, unique: true }
}, { timestamps: true });

module.exports = mongoose.model('Order', orderSchema);