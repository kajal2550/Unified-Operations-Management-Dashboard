import React, { createContext, useState, useCallback } from 'react';

export const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [isLoggedIn, setIsLoggedIn] = useState(true);
  const [user, setUser] = useState({ email: 'kajal', name: 'Kajal' });
  const [loading, setLoading] = useState(false);

  const login = useCallback((email, password) => {
    setLoading(true);
    setTimeout(() => {
      if (email && password) {
        setIsLoggedIn(true);
        setUser({ email, name: email === 'kajal' ? 'Kajal' : email.split('@')[0] });
      }
      setLoading(false);
    }, 600);
  }, []);

  const logout = useCallback(() => {
    setIsLoggedIn(false);
    setUser(null);
  }, []);

  return (
    <AuthContext.Provider value={{ isLoggedIn, user, loading, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}
