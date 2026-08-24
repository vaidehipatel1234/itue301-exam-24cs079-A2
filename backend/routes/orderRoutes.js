const express = require('express');
const router = express.Router();
const Order = require('../models/Order');
const authGuard = require('../middleware/authGuard');

// Protect ALL order routes
router.use(authGuard);

// POST /api/v1/orders - place a new order
router.post('/', async (req, res, next) => {
  try {
    const { restaurantId, items, totalAmount } = req.body;

    if (!restaurantId || !items || items.length === 0) {
      return res.status(400).json({ error: 'restaurantId and items are required.' });
    }

    const order = new Order({
      customerId: req.customer.id,
      restaurantId,
      items,
      totalAmount
    });

    await order.save();
    res.status(201).json({ message: 'Order placed successfully', order });
  } catch (err) {
    if (err.name === 'ValidationError') {
      return res.status(400).json({ error: err.message });
    }
    next(err);
  }
});

// GET /api/v1/orders - get all orders for logged-in customer
router.get('/', async (req, res, next) => {
  try {
    const orders = await Order.find({ customerId: req.customer.id })
      .populate('customerId', 'name email')
      .populate('restaurantId', 'name cuisine');
    res.status(200).json(orders);
  } catch (err) {
    next(err);
  }
});

// PATCH /api/v1/orders/:id/status - update order status
router.patch('/:id/status', async (req, res, next) => {
  try {
    const { status } = req.body;
    const validStatuses = ['pending', 'preparing', 'out-for-delivery', 'delivered', 'cancelled'];

    if (!validStatuses.includes(status)) {
      return res.status(400).json({ error: `Invalid status. Must be one of: ${validStatuses.join(', ')}` });
    }

    const order = await Order.findByIdAndUpdate(
      req.params.id,
      { status },
      { new: true }
    );

    if (!order) {
      return res.status(404).json({ error: 'Order not found.' });
    }

    res.status(200).json({ message: 'Order status updated', order });
  } catch (err) {
    next(err);
  }
});

module.exports = router;
