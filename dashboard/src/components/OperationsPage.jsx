import React, { useEffect, useState } from 'react';
import { fetchOperations } from '../api/apiClient';

export default function OperationsPage() {
  const [loading, setLoading] = useState(true);
  const [operations, setOperations] = useState([]);

  useEffect(() => {
    let isMounted = true;
    fetchOperations().then((result) => {
      if (isMounted) {
        setOperations(result);
        setLoading(false);
      }
    });
    return () => {
      isMounted = false;
    };
  }, []);

  const getStatusColor = (status) => {
    return status === 'running' ? '#06a77d' : status === 'warning' ? '#ffa500' : '#ff6b6b';
  };

  return (
    <>
      <section className="dashboard-header">
        <h2>Operations Control</h2>
        <p>Manage and monitor all operational services</p>
      </section>

      {loading ? (
        <section style={{ marginTop: '2rem' }}>
          <p style={{ color: 'var(--text-secondary)' }}>Loading services...</p>
        </section>
      ) : (

      <section style={{ marginTop: '2rem' }}>
        <h3 style={{ marginBottom: '1.5rem', fontSize: '1.2rem', fontWeight: '600' }}>Active Services</h3>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          {operations.map(op => (
            <div key={op.id} style={{
              background: 'var(--bg-tertiary)',
              border: '1px solid var(--border)',
              borderRadius: '10px',
              padding: '1.5rem',
              transition: 'all 0.3s ease'
            }} className="hover-lift">
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                  <div style={{ 
                    width: '12px', 
                    height: '12px', 
                    borderRadius: '50%', 
                    backgroundColor: getStatusColor(op.status),
                    animation: 'pulse 2s ease-in-out infinite'
                  }}></div>
                  <div>
                    <h4 style={{ margin: 0, marginBottom: '0.25rem', color: 'var(--text-primary)' }}>{op.name}</h4>
                    <p style={{ margin: 0, color: 'var(--text-secondary)', fontSize: '0.85rem' }}>Status: <strong>{op.status.toUpperCase()}</strong></p>
                  </div>
                </div>
                <button style={{
                  padding: '0.5rem 1rem',
                  background: 'var(--secondary)',
                  border: 'none',
                  borderRadius: '6px',
                  color: 'white',
                  cursor: 'pointer',
                  fontWeight: '600',
                  transition: 'all 0.3s ease'
                }}>Manage</button>
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '1rem' }}>
                <div>
                  <p style={{ margin: '0 0 0.25rem 0', color: 'var(--text-secondary)', fontSize: '0.85rem' }}>Uptime</p>
                  <p style={{ margin: 0, fontSize: '1.25rem', fontWeight: '700', color: '#06a77d' }}>{op.uptime}</p>
                </div>
                <div>
                  <p style={{ margin: '0 0 0.25rem 0', color: 'var(--text-secondary)', fontSize: '0.85rem' }}>CPU</p>
                  <p style={{ margin: 0, fontSize: '1.25rem', fontWeight: '700', color: 'var(--secondary)' }}>{op.cpu}</p>
                </div>
                <div>
                  <p style={{ margin: '0 0 0.25rem 0', color: 'var(--text-secondary)', fontSize: '0.85rem' }}>Memory</p>
                  <p style={{ margin: 0, fontSize: '1.25rem', fontWeight: '700', color: '#ffa500' }}>{op.memory}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>
      )}
    </>
  );
}
