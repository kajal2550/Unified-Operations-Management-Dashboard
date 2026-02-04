import React, { useState, useContext } from 'react';
import Header from './components/Header';
import Sidebar from './components/Sidebar';
import Login from './components/Login';
import DashboardPage from './components/DashboardPage';
import OperationsPage from './components/OperationsPage';
import AnalyticsPage from './components/AnalyticsPage';
import TasksPage from './components/TasksPage';
import './styles/Dashboard.css';
import { AuthContext } from './context/AuthContext';
import { ThemeContext } from './context/ThemeContext';

function DashboardApp() {
  const { isDark } = useContext(ThemeContext);
  const [activeTab, setActiveTab] = useState('dashboard');

  const renderPage = () => {
    switch (activeTab) {
      case 'dashboard':
        return <DashboardPage />;
      case 'operations':
        return <OperationsPage />;
      case 'analytics':
        return <AnalyticsPage />;
      case 'tasks':
        return <TasksPage />;
      default:
        return <DashboardPage />;
    }
  };

  return (
    <div className={`app-container ${isDark ? 'dark-mode' : 'light-mode'}`}>
      <Header />
      <div className="main-wrapper">
        <Sidebar activeItem={activeTab} onItemClick={setActiveTab} />
        <main className="main-content">
          {renderPage()}
        </main>
      </div>
    </div>
  );
}

function App() {
  const { isLoggedIn } = useContext(AuthContext);

  if (!isLoggedIn) {
    return <Login />;
  }

  return <DashboardApp />;
}

export default App;
