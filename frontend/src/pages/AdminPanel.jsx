import React from 'react';

// AdminPanel is lazy-loaded (see App.jsx)
function AdminPanel() {
  return (
    <div className="page">
      <h1>Admin Panel 🛠️</h1>
      <p>This page is lazy-loaded using React.lazy + Suspense.</p>
      <div className="admin-info">
        <h2>Platform Overview</h2>
        <p>Manage restaurants, orders, and customers from here.</p>
        <ul>
          <li>📋 View all orders</li>
          <li>🏪 Manage restaurants</li>
          <li>👤 Manage customers</li>
        </ul>
      </div>
    </div>
  );
}

export default AdminPanel;
