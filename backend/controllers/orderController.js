const Order = require('../models/Order');

// Generate unique order reference
const generateOrderNumber = () => {
  const timestamp = Date.now().toString().slice(-6);
  const randomStr = Math.floor(1000 + Math.random() * 9000);
  return `FSH-${timestamp}-${randomStr}`;
};

// Create new order
exports.createOrder = async (req, res) => {
  try {
    const {
      user = null,
      customer,
      items,
      paymentMethod = 'cod',
      installationRequested = false,
      notes = '',
    } = req.body;

    if (!customer || !customer.name || !customer.phone || !customer.address) {
      return res.status(400).json({
        success: false,
        message: 'Customer name, phone, and delivery address are required.',
      });
    }

    if (!items || !Array.isArray(items) || items.length === 0) {
      return res.status(400).json({
        success: false,
        message: 'Order must contain at least one item.',
      });
    }

    // Calculate subtotal
    const subtotal = items.reduce(
      (acc, item) => acc + Number(item.price) * Number(item.quantity),
      0
    );

    // GST calculation (18% for fire safety equipments standard in India)
    const taxAmount = Math.round(subtotal * 0.18);

    // Free delivery on orders over ₹3,000, else ₹150 standard courier
    const shippingFee = subtotal >= 3000 ? 0 : 150;

    const totalAmount = subtotal + taxAmount + shippingFee;

    const orderNumber = generateOrderNumber();

    const order = new Order({
      orderNumber,
      user: user || null,
      customer,
      items,
      subtotal,
      taxAmount,
      shippingFee,
      totalAmount,
      paymentMethod,
      paymentStatus: paymentMethod === 'cod' ? 'Cash on Delivery' : 'Paid',
      orderStatus: 'Order Placed',
      installationRequested,
      trackingNotes: notes,
    });

    const savedOrder = await order.save();

    res.status(201).json({
      success: true,
      message: 'Order placed successfully!',
      data: savedOrder,
    });
  } catch (error) {
    console.error('Error placing order:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to place order. ' + error.message,
    });
  }
};

// Get order by Order Number or ID
exports.getOrderById = async (req, res) => {
  try {
    const identifier = req.params.id;
    let order;

    if (identifier.startsWith('FSH-')) {
      order = await Order.findOne({ orderNumber: identifier });
    } else {
      order = await Order.findById(identifier);
    }

    if (!order) {
      return res.status(404).json({ success: false, message: 'Order not found' });
    }

    res.json({ success: true, data: order });
  } catch (error) {
    console.error('Error retrieving order:', error);
    res.status(500).json({ success: false, message: 'Error retrieving order' });
  }
};

// Get all orders (for store management / admin tracking)
exports.getAllOrders = async (req, res) => {
  try {
    const { status, search } = req.query;
    const query = {};

    if (status && status !== 'All') {
      query.orderStatus = status;
    }

    if (search && search.trim() !== '') {
      query.$or = [
        { orderNumber: { $regex: search.trim(), $options: 'i' } },
        { 'customer.name': { $regex: search.trim(), $options: 'i' } },
        { 'customer.phone': { $regex: search.trim(), $options: 'i' } },
        { 'customer.email': { $regex: search.trim(), $options: 'i' } },
      ];
    }

    const orders = await Order.find(query).sort({ createdAt: -1 });
    res.json({ success: true, count: orders.length, data: orders });
  } catch (error) {
    console.error('Error fetching orders:', error);
    res.status(500).json({ success: false, message: 'Error fetching orders' });
  }
};

// Get orders by specific user
exports.getUserOrders = async (req, res) => {
  try {
    const userId = req.params.userId;
    const orders = await Order.find({ user: userId }).sort({ createdAt: -1 });
    res.json({ success: true, count: orders.length, data: orders });
  } catch (error) {
    console.error('Error fetching user orders:', error);
    res.status(500).json({ success: false, message: 'Error fetching user orders' });
  }
};

// Get Order Analytics / Summary Statistics for Admin
exports.getOrderStats = async (req, res) => {
  try {
    const orders = await Order.find();
    const totalOrders = orders.length;
    const totalRevenue = orders.reduce((sum, ord) => sum + (ord.totalAmount || 0), 0);
    const pendingOrders = orders.filter((o) => o.orderStatus === 'Order Placed').length;
    const processingOrders = orders.filter((o) => o.orderStatus === 'Processing').length;
    const dispatchedOrders = orders.filter((o) => o.orderStatus === 'Dispatched').length;
    const deliveredOrders = orders.filter((o) => o.orderStatus === 'Delivered').length;

    res.json({
      success: true,
      data: {
        totalOrders,
        totalRevenue,
        pendingOrders,
        processingOrders,
        dispatchedOrders,
        deliveredOrders,
      },
    });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Error calculating stats' });
  }
};

// Update order status, payment status, or tracking notes
exports.updateOrderStatus = async (req, res) => {
  try {
    const { orderStatus, paymentStatus, trackingNotes } = req.body;
    const updateFields = {};
    if (orderStatus) updateFields.orderStatus = orderStatus;
    if (paymentStatus) updateFields.paymentStatus = paymentStatus;
    if (trackingNotes !== undefined) updateFields.trackingNotes = trackingNotes;

    const order = await Order.findByIdAndUpdate(req.params.id, updateFields, {
      new: true,
    });

    if (!order) {
      return res.status(404).json({ success: false, message: 'Order not found' });
    }

    res.json({ success: true, message: 'Order updated successfully', data: order });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Error updating order' });
  }
};
