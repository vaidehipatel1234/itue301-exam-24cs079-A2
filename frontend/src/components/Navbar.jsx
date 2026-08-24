import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

function Navbar() {
  const { customer, logout } = useAuth();

  return (
    <nav className="navbar">
      <div className="nav-brand">🍔 QuickBite</div>
      <div className="nav-links">
        <Link to="/">Home</Link>
        <Link to="/restaurants">Restaurants</Link>
        <Link to="/order">Order</Link>
        <Link to="/admin">Admin</Link>
        {customer ? (
          <span className="nav-user">
            👤 {customer.name}
            <button onClick={logout} className="btn-logout">Logout</button>
          </span>
        ) : null}
      </div>
    </nav>
  );
}

export default Navbar;
