import React, { useState, useContext } from 'react';
import '../styles/Header.css';
import { ThemeContext } from '../context/ThemeContext';
import { AuthContext } from '../context/AuthContext';

export default function Header() {
  const { isDark, toggleTheme } = useContext(ThemeContext);
  const { logout, user } = useContext(AuthContext);
  const [showDropdown, setShowDropdown] = useState(false);
  const [time, setTime] = React.useState(new Date());

  React.useEffect(() => {
    const timer = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  const handleLogout = () => {
    logout();
    setShowDropdown(false);
  };

  return (
    <header className={`header ${isDark ? 'dark' : 'light'}`}>
      <div className="header-left">
        <h1 className="logo">📊 Ops Dashboard</h1>
      </div>
      <div className="header-center">
        <input 
          type="text" 
          placeholder="Search operations..." 
          className="search-bar"
        />
      </div>
      <div className="header-right">
        <span className="live-time">{time.toLocaleTimeString()}</span>
        <button className="notification-btn" title="Notifications">🔔</button>
        <button className="settings-btn" title="Settings">⚙️</button>
        <button className="theme-toggle" onClick={toggleTheme} title="Toggle theme">
          {isDark ? '☀️' : '🌙'}
        </button>
        <div className="user-dropdown">
          <button 
            className="user-profile"
            onClick={() => setShowDropdown(!showDropdown)}
            title={user?.name}
          >
            <img src="https://via.placeholder.com/40" alt="User" />
          </button>
          {showDropdown && (
            <div className="dropdown-menu">
              <div className="dropdown-header">
                <p className="dropdown-name">{user?.name}</p>
                <p className="dropdown-email">{user?.email}</p>
              </div>
              <div className="dropdown-divider"></div>
              <button className="dropdown-item">👤 Profile</button>
              <button className="dropdown-item">⚙️ Settings</button>
              <button className="dropdown-item">🔔 Notifications</button>
              <div className="dropdown-divider"></div>
              <button className="dropdown-item logout" onClick={handleLogout}>🚪 Logout</button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}
