import React, { useState, useContext } from 'react';
import '../styles/Login.css';
import { AuthContext } from '../context/AuthContext';

export default function Login() {
  const { login, loading } = useContext(AuthContext);
  const [email, setEmail] = useState('kajal');
  const [password, setPassword] = useState('123');
  const [error, setError] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (!email || !password) {
      setError('Please fill in all fields');
      return;
    }

    setError('');
    login(email, password);
  };

  const quickLogin = () => {
    setError('');
    login('kajal', '123');
  };

  return (
    <div className="login-container">
      <div className="login-wrapper">
        <div className="login-card">
          <div className="login-header">
            <h1 className="login-title">📊 Ops Dashboard</h1>
            <p className="login-subtitle">Unified Operations Management</p>
          </div>

          <form onSubmit={handleSubmit} className="login-form" noValidate>
            <div className="form-group">
              <label htmlFor="email" className="form-label">Username</label>
              <input
                id="email"
                type="text"
                className="form-input"
                placeholder="kajal"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                disabled={loading}
                autoComplete="username"
              />
            </div>

            <div className="form-group">
              <label htmlFor="password" className="form-label">Password</label>
              <input
                id="password"
                type="password"
                className="form-input"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                disabled={loading}
                autoComplete="current-password"
              />
            </div>

            {error && <div className="form-error">{error}</div>}

            <button type="submit" className="btn-login" disabled={loading}>
              {loading ? 'Logging in...' : 'Login'}
            </button>
          </form>

          <div className="login-divider">
            <span>or</span>
          </div>

          <button onClick={quickLogin} className="btn-demo" disabled={loading} type="button">
            ⚡ Quick Login as Kajal
          </button>

          <div className="login-info">
            <p className="info-title">✓ Default Credentials:</p>
            <p className="info-text">Username: <strong>kajal</strong></p>
            <p className="info-text">Password: <strong>123</strong></p>
          </div>

          <div className="login-footer">
            <p>© 2026 Ops Dashboard. All rights reserved.</p>
          </div>
        </div>

        <div className="login-background">
          <div className="gradient-circle circle-1"></div>
          <div className="gradient-circle circle-2"></div>
          <div className="gradient-circle circle-3"></div>
        </div>
      </div>
    </div>
  );
}
