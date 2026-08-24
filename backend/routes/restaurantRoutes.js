const express = require('express');
const router = express.Router();
const Restaurant = require('../models/Restaurant');

// GET /api/v1/restaurants - public route, no auth needed
router.get('/', async (req, res, next) => {
  try {
    const restaurants = await Restaurant.find();
    res.status(200).json(restaurants);
  } catch (err) {
    next(err);
  }
});

// POST /api/v1/restaurants - add a restaurant (for seeding test data)
router.post('/', async (req, res, next) => {
  try {
    const { name, cuisine, rating, isOpen } = req.body;
    const restaurant = new Restaurant({ name, cuisine, rating, isOpen });
    await restaurant.save();
    res.status(201).json(restaurant);
  } catch (err) {
    if (err.name === 'ValidationError') {
      return res.status(400).json({ error: err.message });
    }
    next(err);
  }
});

module.exports = router;
