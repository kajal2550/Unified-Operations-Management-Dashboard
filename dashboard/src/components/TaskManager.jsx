import React, { useState } from 'react';
import '../styles/TaskManager.css';

export default function TaskManager({ tasks: externalTasks, onToggle }) {
  const [internalTasks, setInternalTasks] = useState([
    { id: 1, title: 'Server maintenance', status: 'in-progress', priority: 'high' },
    { id: 2, title: 'Database backup', status: 'completed', priority: 'medium' },
    { id: 3, title: 'Security audit', status: 'pending', priority: 'high' },
    { id: 4, title: 'Update dependencies', status: 'pending', priority: 'low' },
  ]);

  const tasks = externalTasks && externalTasks.length ? externalTasks : internalTasks;

  const toggleTask = (id) => {
    if (onToggle) {
      onToggle(id);
      return;
    }

    setInternalTasks((prev) =>
      prev.map((task) =>
        task.id === id
          ? { ...task, status: task.status === 'completed' ? 'pending' : 'completed' }
          : task
      )
    );
  };

  const getPriorityColor = (priority) => {
    return {
      high: '#ff6b6b',
      medium: '#ffa94d',
      low: '#74c0fc'
    }[priority];
  };

  const getStatusIcon = (status) => {
    return {
      completed: '✓',
      'in-progress': '⏳',
      pending: '⭕'
    }[status];
  };

  return (
    <div className="task-manager">
      <h3 className="task-title">Active Tasks</h3>
      <div className="task-list">
        {tasks.map(task => (
          <div key={task.id} className={`task-item ${task.status}`}>
            <button 
              className="task-checkbox"
              onClick={() => toggleTask(task.id)}
            >
              {getStatusIcon(task.status)}
            </button>
            <div className="task-content">
              <p className="task-name">{task.title}</p>
            </div>
            <span 
              className="priority-badge" 
              style={{ backgroundColor: getPriorityColor(task.priority) }}
            >
              {task.priority}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
