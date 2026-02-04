import React, { useEffect, useState } from 'react';
import KPICard from './KPICard';
import Chart from './Chart';
import DonutChart from './DonutChart';
import AreaChart from './AreaChart';
import StatCard from './StatCard';
import TaskManager from './TaskManager';
import Alert from './Alert';
import { fetchDashboardData, updateTaskStatus } from '../api/apiClient';

export default function DashboardPage() {
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState({
    kpis: [],
    throughputData: [],
    uptimeData: [],
    serviceStatusData: [],
    requestTrendData: [],
    statsData: [],
    tasks: [],
    alerts: [],
  });

  useEffect(() => {
    let isMounted = true;
    fetchDashboardData().then((result) => {
      if (isMounted) {
        setData(result);
        setLoading(false);
      }
    });
    return () => {
      isMounted = false;
    };
  }, []);

  const toggleTask = async (id) => {
    let nextStatus = 'pending';
    setData((prev) => {
      const tasks = prev.tasks.map((task) => {
        if (task.id !== id) return task;
        nextStatus = task.status === 'completed' ? 'pending' : 'completed';
        return { ...task, status: nextStatus };
      });
      return { ...prev, tasks };
    });

    try {
      await updateTaskStatus(id, nextStatus);
    } catch (error) {
      // rollback on failure
      setData((prev) => ({
        ...prev,
        tasks: prev.tasks.map((task) =>
          task.id === id
            ? { ...task, status: task.status === 'completed' ? 'pending' : 'completed' }
            : task
        ),
      }));
    }
  };

  if (loading) {
    return (
      <section className="dashboard-header">
        <h2>Loading Dashboard...</h2>
        <p>Fetching latest operational data</p>
      </section>
    );
  }

  return (
    <>
      <section className="dashboard-header">
        <h2>Operations Dashboard</h2>
        <p>Real-time system monitoring and management</p>
      </section>

      <section className="kpi-section">
        <div className="kpi-grid">
          {data.kpis.map((kpi, idx) => (
            <KPICard 
              key={idx}
              title={kpi.title}
              value={kpi.value}
              change={kpi.change}
              icon={kpi.icon}
              trend={kpi.trend}
            />
          ))}
        </div>
      </section>

      <section className="stats-section">
        <h3 className="section-title">Resource Usage</h3>
        <div className="stats-grid">
          {data.statsData.map((stat, idx) => (
            <StatCard 
              key={idx}
              icon={stat.icon}
              label={stat.label}
              value={stat.value}
              subtitle={stat.subtitle}
              color={stat.color}
            />
          ))}
        </div>
      </section>

      <section className="charts-section">
        <div className="chart-row">
          <div className="chart-wrapper">
            <Chart title="Daily Throughput" data={data.throughputData} type="bar" />
          </div>
          <div className="chart-wrapper">
            <DonutChart title="Service Status" data={data.serviceStatusData} />
          </div>
        </div>
      </section>

      <section className="charts-section">
        <div className="chart-row chart-full">
          <div className="chart-wrapper">
            <AreaChart title="Request Trend (6 Months)" data={data.requestTrendData} />
          </div>
        </div>
      </section>

      <section className="lower-section">
        <div className="tasks-wrapper">
          <TaskManager tasks={data.tasks} onToggle={toggleTask} />
        </div>
        <div className="alerts-wrapper">
          <Alert alerts={data.alerts} />
        </div>
      </section>
    </>
  );
}
