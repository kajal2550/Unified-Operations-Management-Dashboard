import React, { useState } from 'react';
import '../styles/Sidebar.css';

export default function Sidebar({ activeItem, onItemClick }) {
  const [isExpanded, setIsExpanded] = useState(true);

  const menuItems = [
    { id: 'dashboard', label: 'Dashboard', icon: '📈' },
    { id: 'operations', label: 'Operations', icon: '⚙️' },
    { id: 'analytics', label: 'Analytics', icon: '📊' },
    { id: 'tasks', label: 'Tasks', icon: '✓' },
    { id: 'alerts', label: 'Alerts', icon: '⚠️' },
    { id: 'reports', label: 'Reports', icon: '📄' },
    { id: 'settings', label: 'Settings', icon: '🔧' },
  ];

  return (
    <aside className={`sidebar ${!isExpanded ? 'collapsed' : ''}`}>
      <nav className="sidebar-nav">
        {menuItems.map((item) => (
          <button
            key={item.id}
            className={`nav-item ${activeItem === item.id ? 'active' : ''}`}
            onClick={() => onItemClick(item.id)}
            title={item.label}
          >
            <span className="nav-icon">{item.icon}</span>
            <span className="nav-label">{item.label}</span>
          </button>
        ))}
      </nav>
      <button 
        className="sidebar-toggle"
        onClick={() => setIsExpanded(!isExpanded)}
        title="Toggle sidebar"
      >
        {isExpanded ? '◀' : '▶'}
      </button>
    </aside>
  );
}
