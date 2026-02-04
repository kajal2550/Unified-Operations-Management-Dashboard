// Add updateTaskStatus to mock API
export async function updateTaskStatus(id, status) {
  await delay(200);
  // This is a mock, so just return success
  return { id, status, success: true };
}
const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

export async function fetchDashboardData() {
  await delay(400);
  return {
    kpis: [
      { title: 'System Health', value: '98%', change: 2, icon: '💚', trend: 'up' },
      { title: 'Active Services', value: '24/24', change: 0, icon: '🟢', trend: 'up' },
      { title: 'Response Time', value: '45ms', change: -12, icon: '⚡', trend: 'up' },
      { title: 'Error Rate', value: '0.2%', change: -5, icon: '📉', trend: 'up' },
    ],
    throughputData: [
      { label: 'Mon', value: 65 },
      { label: 'Tue', value: 78 },
      { label: 'Wed', value: 92 },
      { label: 'Thu', value: 85 },
      { label: 'Fri', value: 88 },
      { label: 'Sat', value: 72 },
      { label: 'Sun', value: 65 },
    ],
    uptimeData: [
      { label: 'Week 1', value: 99.5 },
      { label: 'Week 2', value: 99.8 },
      { label: 'Week 3', value: 99.2 },
      { label: 'Week 4', value: 99.9 },
    ],
    serviceStatusData: [
      { label: 'Running', value: 85, color: '#06a77d' },
      { label: 'Pending', value: 10, color: '#ffa500' },
      { label: 'Failed', value: 5, color: '#ff6b6b' },
    ],
    requestTrendData: [
      { label: 'Jan', value: 45 },
      { label: 'Feb', value: 52 },
      { label: 'Mar', value: 48 },
      { label: 'Apr', value: 61 },
      { label: 'May', value: 75 },
      { label: 'Jun', value: 82 },
    ],
    statsData: [
      { icon: '⚙️', label: 'CPU Usage', value: '68%', subtitle: 'Normal', color: '#0066cc' },
      { icon: '💾', label: 'Memory', value: '75%', subtitle: 'High', color: '#00b4d8' },
      { icon: '💿', label: 'Disk Space', value: '82%', subtitle: 'High', color: '#ff006e' },
      { icon: '🌐', label: 'Network', value: '45%', subtitle: 'Normal', color: '#ffa500' },
    ],
    tasks: [
      { id: 1, title: 'Server maintenance', status: 'in-progress', priority: 'high' },
      { id: 2, title: 'Database backup', status: 'completed', priority: 'medium' },
      { id: 3, title: 'Security audit', status: 'pending', priority: 'high' },
      { id: 4, title: 'Update dependencies', status: 'pending', priority: 'low' },
    ],
    alerts: [
      { id: 1, type: 'error', message: 'High CPU usage detected on Server 3', time: '2 min ago' },
      { id: 2, type: 'warning', message: 'Memory usage at 85% on Server 1', time: '15 min ago' },
      { id: 3, type: 'info', message: 'Backup completed successfully', time: '1 hour ago' },
      { id: 4, type: 'error', message: 'Connection timeout on Database 2', time: '3 hours ago' },
    ],
  };
}

export async function fetchOperations() {
  await delay(400);
  return [
    { id: 1, name: 'API Gateway', status: 'running', uptime: '99.9%', cpu: '32%', memory: '45%' },
    { id: 2, name: 'Database', status: 'running', uptime: '99.99%', cpu: '28%', memory: '62%' },
    { id: 3, name: 'Cache Server', status: 'running', uptime: '99.5%', cpu: '18%', memory: '38%' },
    { id: 4, name: 'Load Balancer', status: 'running', uptime: '100%', cpu: '12%', memory: '22%' },
    { id: 5, name: 'Message Queue', status: 'warning', uptime: '98.8%', cpu: '75%', memory: '81%' },
  ];
}

export async function fetchAnalytics() {
  await delay(400);
  return [
    { label: 'Total Requests', value: '2.5M', change: '+12%', icon: '📊' },
    { label: 'Avg Response Time', value: '142ms', change: '-8%', icon: '⚡' },
    { label: 'Error Rate', value: '0.18%', change: '-3%', icon: '❌' },
    { label: 'Uptime', value: '99.98%', change: '+0.2%', icon: '✓' },
    { label: 'Active Users', value: '45.2K', change: '+22%', icon: '👥' },
    { label: 'Data Processed', value: '1.2TB', change: '+15%', icon: '💾' },
  ];
}

export async function fetchTasks() {
  await delay(400);
  return [
    { id: 1, title: 'Database Optimization', description: 'Optimize query performance', status: 'in-progress', priority: 'high', dueDate: '2026-02-10' },
    { id: 2, title: 'Security Audit', description: 'Complete security audit', status: 'pending', priority: 'high', dueDate: '2026-02-15' },
    { id: 3, title: 'API Documentation', description: 'Update API documentation', status: 'completed', priority: 'medium', dueDate: '2026-02-05' },
    { id: 4, title: 'Cache Implementation', description: 'Implement Redis cache', status: 'pending', priority: 'medium', dueDate: '2026-02-20' },
    { id: 5, title: 'Monitoring Setup', description: 'Setup system monitoring', status: 'completed', priority: 'low', dueDate: '2026-02-03' },
  ];
}

export async function fetchAlerts() {
  await delay(400);
  return [
    { id: 1, type: 'error', message: 'High CPU usage detected on Server 3', time: '2 min ago' },
    { id: 2, type: 'warning', message: 'Memory usage at 85% on Server 1', time: '15 min ago' },
    { id: 3, type: 'info', message: 'Backup completed successfully', time: '1 hour ago' },
    { id: 4, type: 'error', message: 'Connection timeout on Database 2', time: '3 hours ago' },
  ];
}
