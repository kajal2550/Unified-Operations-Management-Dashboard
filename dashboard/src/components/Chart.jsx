import React from 'react';
import '../styles/Chart.css';

export default function Chart({ title, data, type = 'bar' }) {
  const maxValue = Math.max(...data.map(d => d.value));

  if (type === 'bar') {
    return (
      <div className="chart-container">
        <h3 className="chart-title">{title}</h3>
        <div className="bar-chart">
          {data.map((item, idx) => (
            <div key={idx} className="bar-item">
              <div className="bar-wrapper">
                <div 
                  className="bar" 
                  style={{ height: `${(item.value / maxValue) * 100}%` }}
                />
              </div>
              <label className="bar-label">{item.label}</label>
            </div>
          ))}
        </div>
      </div>
    );
  }

  if (type === 'line') {
    return (
      <div className="chart-container">
        <h3 className="chart-title">{title}</h3>
        <div className="line-chart">
          <svg viewBox="0 0 400 150" preserveAspectRatio="none">
            <polyline 
              points={data.map((d, i) => `${(i / (data.length - 1)) * 400},${150 - (d.value / maxValue) * 100}`).join(' ')}
              className="line"
            />
          </svg>
          <div className="line-labels">
            {data.map((item, idx) => (
              <span key={idx} className="line-label">{item.label}</span>
            ))}
          </div>
        </div>
      </div>
    );
  }

  return null;
}
