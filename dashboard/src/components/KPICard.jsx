import React, { useState, useEffect } from 'react';
import '../styles/KPICard.css';

export default function KPICard({ title, value, change, icon, trend }) {
  const [displayValue, setDisplayValue] = useState(0);

  useEffect(() => {
    const numValue = parseInt(value);
    if (!isNaN(numValue)) {
      let current = 0;
      const step = numValue / 20;
      const interval = setInterval(() => {
        current += step;
        if (current >= numValue) {
          setDisplayValue(numValue);
          clearInterval(interval);
        } else {
          setDisplayValue(Math.floor(current));
        }
      }, 30);
      return () => clearInterval(interval);
    }
  }, [value]);

  const finalValue = isNaN(parseInt(value)) ? value : displayValue;

  return (
    <div className="kpi-card">
      <div className="kpi-header">
        <h3 className="kpi-title">{title}</h3>
        <span className="kpi-icon">{icon}</span>
      </div>
      <div className="kpi-value">{finalValue}{isNaN(parseInt(value)) ? '' : value.replace(/\d/g, '')}</div>
      <div className={`kpi-change ${trend === 'up' ? 'positive' : 'negative'}`}>
        <span className="trend-icon">{trend === 'up' ? '📈' : '📉'}</span>
        <span>{Math.abs(change)}% from last week</span>
      </div>
      <div className="kpi-bar">
        <div className="kpi-fill" style={{ width: `${finalValue}%` }}></div>
      </div>
    </div>
  );
}
