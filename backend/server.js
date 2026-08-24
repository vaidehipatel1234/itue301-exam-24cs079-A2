require('dotenv').config();
const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');

const requestLogger = require('./middleware/requestLogger');
const errorHandler = require('./middleware/errorHandler');

const authRoutes = require('./routes/authRoutes');
const restaurantRoutes = require('./routes/restaurantRoutes');
const orderRoutes = require('./routes/orderRoutes');

const app = express();

// Global Middleware
app.use(cors());
app.use(express.json());
app.use(requestLogger); // logs every request

// Routes
app.use('/api/v1/auth', authRoutes);
app.use('/api/v1/restaurants', restaurantRoutes);
app.use('/api/v1/orders', orderRoutes);

// Global Error Handler (must be last)
app.use(errorHandler);

// Connect to MongoDB then start server
const startServer = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI, {
      tls: true,
      tlsAllowInvalidCertificates: true
    });
    console.log('Connected to MongoDB Atlas');
    app.listen(process.env.PORT || 5000, () => {
      console.log(`Server running on port ${process.env.PORT || 5000}`);
    });
  } catch (err) {
    console.error('MongoDB connection failed:', err.message);
    process.exit(1);
  }
};

startServer();
