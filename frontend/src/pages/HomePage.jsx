import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

function HomePage() {
  const { customer } = useAuth();

  return (
    <div className="page home-page">
      <h1>Welcome to QuickBite 🍔</h1>
      <p>Order food from your favourite restaurants, fast and easy.</p>
      {customer && <p className="welcome-msg">Hello, {customer.name}! 👋</p>}
      <div className="home-links">
        <Link to="/restaurants" className="btn-primary">Browse Restaurants</Link>
        <Link to="/order" className="btn-secondary">Place an Order</Link>
      </div>
    </div>
  );
}

export default HomePage;
