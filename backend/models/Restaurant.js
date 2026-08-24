const mongoose = require('mongoose');

const restaurantSchema = new mongoose.Schema({
  name:    { type: String, required: true },
  cuisine: { type: String, required: true },
  rating:  { type: Number, min: 0, max: 5 },
  isOpen:  { type: Boolean, default: true }
});

module.exports = mongoose.model('Restaurant', restaurantSchema);
