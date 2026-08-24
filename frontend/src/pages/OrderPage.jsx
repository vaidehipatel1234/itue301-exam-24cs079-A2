import React, { useState } from 'react';
import axios from 'axios';
import { useAuth } from '../context/AuthContext';

function OrderPage() {
  const { token } = useAuth();

  // State 1: form data
  const [formData, setFormData] = useState({
    restaurantId: '',
    itemName: '',
    quantity: 1,
    deliveryAddress: ''
  });

  // State 2: submitted order message
  const [message, setMessage] = useState('');

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const orderPayload = {
        restaurantId: formData.restaurantId,
        items: [{ name: formData.itemName, quantity: formData.quantity }],
        totalAmount: 0,
        deliveryAddress: formData.deliveryAddress
      };
      await axios.post('http://localhost:5000/api/v1/orders', orderPayload, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setMessage('✅ Order placed successfully!');
      setFormData({ restaurantId: '', itemName: '', quantity: 1, deliveryAddress: '' });
    } catch (err) {
      setMessage('❌ Failed to place order. Check if backend is running.');
    }
  };

  return (
    <div className="page">
      <h1>Place an Order 🛒</h1>
      <form onSubmit={handleSubmit} className="order-form">
        <label>Restaurant ID</label>
        <input
          type="text"
          name="restaurantId"
          placeholder="Paste Restaurant ID here"
          value={formData.restaurantId}
          onChange={handleChange}
          required
        />

        <label>Item Name</label>
        <input
          type="text"
          name="itemName"
          placeholder="e.g. Burger"
          value={formData.itemName}
          onChange={handleChange}
          required
        />

        <label>Quantity</label>
        <input
          type="number"
          name="quantity"
          min="1"
          value={formData.quantity}
          onChange={handleChange}
          required
        />

        <label>Delivery Address</label>
        <input
          type="text"
          name="deliveryAddress"
          placeholder="Enter delivery address"
          value={formData.deliveryAddress}
          onChange={handleChange}
          required
        />

        {/* Show current form state live */}
        <div className="order-preview">
          <strong>Order Preview:</strong>
          <p>Item: {formData.itemName || '—'} × {formData.quantity}</p>
          <p>Address: {formData.deliveryAddress || '—'}</p>
        </div>

        <button type="submit" className="btn-primary">Place Order</button>
      </form>
      {message && <p className="order-msg">{message}</p>}
    </div>
  );
}

export default OrderPage;
