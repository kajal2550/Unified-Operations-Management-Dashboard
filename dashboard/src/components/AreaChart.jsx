import React from 'react';
import '../styles/AreaChart.css';

export default function AreaChart({ title, data }) {
  const maxValue = Math.max(...data.map(d => d.value));
  const points = data.map((d, i) => ({
    x: (i / (data.length - 1)) * 100,
    y: 100 - (d.value / maxValue) * 80
  }));

  const pathPoints = points.map(p => `${p.x},${p.y}`).join(' ');
  const areaPoints = `0,100 ${pathPoints} 100,100`;

  return (
    <div className="area-chart-container">
      <h3 className="chart-title">{title}</h3>
      <svg viewBox="0 0 100 100" preserveAspectRatio="none" className="area-svg">
        <defs>
          <linearGradient id="areaGradient" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" style={{ stopColor: 'var(--secondary)', stopOpacity: 0.5 }} />
            <stop offset="100%" style={{ stopColor: 'var(--primary)', stopOpacity: 0.1 }} />
          </linearGradient>
        </defs>
        <polyline 
          points={areaPoints}
          fill="url(#areaGradient)"
          className="area"
        />
        <polyline 
          points={pathPoints}
          fill="none"
          stroke="var(--secondary)"
          strokeWidth="0.5"
          className="line"
        />
        {points.map((p, i) => (
          <circle
            key={i}
            cx={p.x}
            cy={p.y}
            r="1"
            fill="var(--secondary)"
            className="data-point"
          />
        ))}
      </svg>
      <div className="area-labels">
        {data.map((item, idx) => (
          <span key={idx} className="area-label">{item.label}</span>
        ))}
      </div>
    </div>
  );
}
