import React, { useEffect, useState } from 'react';
import { fetchAnalytics } from '../api/apiClient';

export default function AnalyticsPage() {
  const [loading, setLoading] = useState(true);
  const [metrics, setMetrics] = useState([]);

  useEffect(() => {
    let isMounted = true;
    fetchAnalytics().then((result) => {
      if (isMounted) {
        setMetrics(result);
        setLoading(false);
      }
    });
    return () => {
      isMounted = false;
    };
  }, []);

  return (
    <>
      <section className="dashboard-header">
        <h2>Analytics & Insights</h2>
        <p>Detailed performance metrics and analytics</p>
      </section>

      <section style={{ marginTop: '2rem' }}>
        <h3 style={{ marginBottom: '1.5rem', fontSize: '1.2rem', fontWeight: '600' }}>Key Metrics</h3>
        {loading ? (
          <p style={{ color: 'var(--text-secondary)' }}>Loading analytics...</p>
        ) : (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '1.5rem' }}>
          {metrics.map((metric, idx) => (
            <div key={idx} style={{
              background: 'linear-gradient(135deg, var(--bg-tertiary) 0%, rgba(0, 102, 204, 0.1) 100%)',
              border: '1px solid var(--border)',
              borderRadius: '12px',
              padding: '1.5rem',
              transition: 'all 0.3s ease'
            }} className="hover-lift">
              <div style={{ fontSize: '2rem', marginBottom: '0.75rem' }}>{metric.icon}</div>
              <p style={{ margin: '0 0 0.5rem 0', color: 'var(--text-secondary)', fontSize: '0.9rem', fontWeight: '600', textTransform: 'uppercase' }}>{metric.label}</p>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end' }}>
                <h3 style={{ margin: 0, fontSize: '2rem', fontWeight: '700', color: 'var(--text-primary)' }}>{metric.value}</h3>
                <span style={{ color: metric.change.includes('+') ? '#06a77d' : '#ff6b6b', fontWeight: '600' }}>{metric.change}</span>
              </div>
            </div>
          ))}
        </div>
        )}
      </section>

      <section style={{ marginTop: '2rem', background: 'var(--bg-tertiary)', border: '1px solid var(--border)', borderRadius: '12px', padding: '2rem' }}>
        <h3 style={{ marginTop: 0, marginBottom: '1rem', fontSize: '1.2rem', fontWeight: '600' }}>Performance Trends</h3>
        <p style={{ color: 'var(--text-secondary)' }}>📈 Performance has improved by 23% over the last 30 days with an average response time reduction of 45ms.</p>
      </section>
    </>
  );
}
