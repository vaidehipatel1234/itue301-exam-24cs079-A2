import React, { Suspense, lazy } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { AuthProvider, ProtectedRoute } from './context/AuthContext';
import Navbar from './components/Navbar';
import HomePage from './pages/HomePage';
import RestaurantsPage from './pages/RestaurantsPage';
import OrderPage from './pages/OrderPage';

// Lazy load AdminPanel (Task 2 requirement)
const AdminPanel = lazy(() => import('./pages/AdminPanel'));

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Navbar />
        <Routes>
          {/* Route 1: Home */}
          <Route path="/" element={<HomePage />} />

          {/* Route 2: Restaurants */}
          <Route path="/restaurants" element={<RestaurantsPage />} />

          {/* Route 3: Order - PROTECTED (redirects to / if not logged in) */}
          <Route
            path="/order"
            element={
              <ProtectedRoute>
                <OrderPage />
              </ProtectedRoute>
            }
          />

          {/* Route 4: Admin - LAZY LOADED */}
          <Route
            path="/admin"
            element={
              <Suspense fallback={<div className="page"><p>⏳ Loading Admin Panel...</p></div>}>
                <AdminPanel />
              </Suspense>
            }
          />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;
