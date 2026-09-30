const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema(
  {
    orderNumber: {
      type: String,
      required: true,
      unique: true,
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      default: null,
    },
    customer: {
      name: { type: String, required: true },
      email: { type: String, required: true },
      phone: { type: String, required: true },
      address: { type: String, required: true },
      city: { type: String, required: true },
      state: { type: String, default: 'Maharashtra' },
      pincode: { type: String, required: true },
      companyName: { type: String, default: '' },
      gstNumber: { type: String, default: '' },
    },
    items: [
      {
        product: {
          type: mongoose.Schema.Types.ObjectId,
          ref: 'Product',
        },
        name: { type: String, required: true },
        price: { type: Number, required: true },
        quantity: { type: Number, required: true, min: 1 },
        image: { type: String },
        sku: { type: String },
      },
    ],
    subtotal: { type: Number, required: true },
    taxAmount: { type: Number, required: true },
    shippingFee: { type: Number, default: 0 },
    totalAmount: { type: Number, required: true },
    paymentMethod: {
      type: String,
      enum: ['cod', 'upi', 'card', 'bank_transfer'],
      default: 'cod',
    },
    paymentStatus: {
      type: String,
      enum: ['Pending', 'Paid', 'Cash on Delivery'],
      default: 'Pending',
    },
    orderStatus: {
      type: String,
      enum: ['Order Placed', 'Processing', 'Dispatched', 'Delivered', 'Cancelled'],
      default: 'Order Placed',
    },
    installationRequested: {
      type: Boolean,
      default: false,
    },
    trackingNotes: {
      type: String,
      default: '',
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model('Order', orderSchema);
