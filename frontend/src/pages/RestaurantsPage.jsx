import React, { useEffect, useState } from 'react';
import axios from 'axios';
import RestaurantCard from '../components/RestaurantCard';

function RestaurantsPage() {
  const [restaurants, setRestaurants] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [search, setSearch] = useState('');

  useEffect(() => {
    axios.get('http://localhost:5000/api/v1/restaurants')
      .then((res) => {
        setRestaurants(res.data);
        setLoading(false);
      })
      .catch((err) => {
        setError('Failed to load restaurants. Is the backend running?');
        setLoading(false);
      });
  }, []);

  // Filter restaurants by name or cuisine (no new API call)
  const filtered = restaurants.filter((r) =>
    r.name.toLowerCase().includes(search.toLowerCase()) ||
    r.cuisine.toLowerCase().includes(search.toLowerCase())
  );

  if (loading) return <div className="page"><p>⏳ Loading restaurants...</p></div>;
  if (error)   return <div className="page"><p className="error-msg">❌ {error}</p></div>;

  return (
    <div className="page">
      <h1>All Restaurants</h1>
      <input
        type="text"
        placeholder="Search by name or cuisine..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="search-input"
      />
      {filtered.length === 0 ? (
        <p>No restaurants found.</p>
      ) : (
        <div className="cards-grid">
          {filtered.map((restaurant) => (
            <RestaurantCard
              key={restaurant._id}
              name={restaurant.name}
              cuisine={restaurant.cuisine}
              rating={restaurant.rating}
              isOpen={restaurant.isOpen}
            />
          ))}
        </div>
      )}
    </div>
  );
}

export default RestaurantsPage;
