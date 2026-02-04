import React from 'react';
import '../styles/Alert.css';

export default function Alert({ alerts = [] }) {
  const fallbackAlerts = [
    { id: 1, type: 'error', message: 'High CPU usage detected on Server 3', time: '2 min ago' },
    { id: 2, type: 'warning', message: 'Memory usage at 85% on Server 1', time: '15 min ago' },
    { id: 3, type: 'info', message: 'Backup completed successfully', time: '1 hour ago' },
    { id: 4, type: 'error', message: 'Connection timeout on Database 2', time: '3 hours ago' },
  ];

  const displayAlerts = alerts.length ? alerts : fallbackAlerts;

  const getAlertIcon = (type) => {
    return {
      error: '❌',
      warning: '⚠️',
      info: 'ℹ️'
    }[type];
  };

  return (
    <div className="alerts-container">
      <h3 className="alerts-title">System Alerts</h3>
      <div className="alerts-list">
        {displayAlerts.map(alert => (
          <div key={alert.id} className={`alert-item ${alert.type}`}>
            <span className="alert-icon">{getAlertIcon(alert.type)}</span>
            <div className="alert-content">
              <p className="alert-message">{alert.message}</p>
              <span className="alert-time">{alert.time}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
