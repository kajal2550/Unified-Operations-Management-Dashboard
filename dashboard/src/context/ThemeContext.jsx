import React, { createContext, useState, useEffect } from 'react';

export const ThemeContext = createContext();

export function ThemeProvider({ children }) {
  const [isDark, setIsDark] = useState(true);

  useEffect(() => {
    const saved = localStorage.getItem('theme');
    if (saved) setIsDark(JSON.parse(saved));
  }, []);

  const toggleTheme = () => {
    setIsDark(prev => {
      localStorage.setItem('theme', JSON.stringify(!prev));
      return !prev;
    });
  };

  return (
    <ThemeContext.Provider value={{ isDark, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}
