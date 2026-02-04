import React from 'react';
import '../styles/StatCard.css';

export default function StatCard({ icon, label, value, subtitle, color }) {
  return (
    <div className="stat-card" style={{ borderLeftColor: color }}>
      <div className="stat-icon" style={{ backgroundColor: `${color}20` }}>
        {icon}
      </div>
      <div className="stat-content">
        <p className="stat-label">{label}</p>
        <h4 className="stat-value">{value}</h4>
        {subtitle && <p className="stat-subtitle">{subtitle}</p>}
      </div>
    </div>
  );
}
