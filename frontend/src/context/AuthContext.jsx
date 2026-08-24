import React, { createContext, useContext, useState } from 'react';
import { Navigate } from 'react-router-dom';

// Create context
const AuthContext = createContext(null);

// AuthProvider wraps the whole app and shares auth state
export function AuthProvider({ children }) {
  const [customer, setCustomer] = useState(null); // logged-in customer info
  const [token, setToken] = useState(null);       // JWT token

  // Call this after successful login
  const login = (customerData, jwtToken) => {
    setCustomer(customerData);
    setToken(jwtToken);
  };

  // Call this to log out
  const logout = () => {
    setCustomer(null);
    setToken(null);
  };

  return (
    <AuthContext.Provider value={{ customer, token, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

// Custom hook to use auth anywhere
export function useAuth() {
  return useContext(AuthContext);
}

// ProtectedRoute - redirects to home if not logged in
export function ProtectedRoute({ children }) {
  const { token } = useAuth();
  if (!token) {
    return <Navigate to="/" />;
  }
  return children;
}
