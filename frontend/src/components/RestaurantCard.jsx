import React from 'react';

// RestaurantCard component - accepts name, cuisine, rating, isOpen as props
function RestaurantCard({ name, cuisine, rating, isOpen }) {
  return (
    <div className="restaurant-card">
      <h3 className="card-name">{name}</h3>
      <p className="card-cuisine">🍽️ {cuisine}</p>
      <p className="card-rating">⭐ Rating: {rating} / 5</p>
      <span className={isOpen ? 'status-open' : 'status-closed'}>
        {isOpen ? '🟢 Open Now' : '🔴 Closed'}
      </span>
    </div>
  );
}

export default RestaurantCard;
