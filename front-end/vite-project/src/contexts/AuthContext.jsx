import React, { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [username, setUsername] = useState(() => {
    // Load username from localStorage if it exists
    return localStorage.getItem('username');
  });

  const login = (username) => {
    setUsername(username);
    localStorage.setItem('username', username);
  };

  const logout = () => {
    setUsername(null);
    localStorage.removeItem('username');
  };

  // Derived state to check if the user is authenticated
  const isAuthenticated = !!username;

  return (
    <AuthContext.Provider value={{ username, isAuthenticated, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
