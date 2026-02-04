import React from 'react';
import '../styles/DonutChart.css';

export default function DonutChart({ title, data }) {
  const total = data.reduce((sum, item) => sum + item.value, 0);
  let startAngle = 0;

  return (
    <div className="donut-chart-container">
      <h3 className="chart-title">{title}</h3>
      <svg viewBox="0 0 200 200" className="donut-svg">
        {data.map((item, idx) => {
          const sliceAngle = (item.value / total) * 360;
          const startRad = (startAngle * Math.PI) / 180;
          const endRad = ((startAngle + sliceAngle) * Math.PI) / 180;
          
          const x1 = 100 + 60 * Math.cos(startRad);
          const y1 = 100 + 60 * Math.sin(startRad);
          const x2 = 100 + 60 * Math.cos(endRad);
          const y2 = 100 + 60 * Math.sin(endRad);
          
          const largeArc = sliceAngle > 180 ? 1 : 0;
          
          const pathData = `
            M ${x1} ${y1}
            A 60 60 0 ${largeArc} 1 ${x2} ${y2}
            L ${100 + 35 * Math.cos(endRad)} ${100 + 35 * Math.sin(endRad)}
            A 35 35 0 ${largeArc} 0 ${100 + 35 * Math.cos(startRad)} ${100 + 35 * Math.sin(startRad)}
            Z
          `;

          const result = (
            <path
              key={idx}
              d={pathData}
              fill={item.color}
              className="donut-segment"
            />
          );
          
          startAngle += sliceAngle;
          return result;
        })}
        <circle cx="100" cy="100" r="35" fill="var(--bg-tertiary)" />
      </svg>
      <div className="donut-legend">
        {data.map((item, idx) => (
          <div key={idx} className="legend-item">
            <div className="legend-color" style={{ backgroundColor: item.color }}></div>
            <span className="legend-label">{item.label}</span>
            <span className="legend-value">{item.value}%</span>
          </div>
        ))}
      </div>
    </div>
  );
}
