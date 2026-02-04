import React, { useEffect, useState } from 'react';
import { fetchTasks, updateTaskStatus } from '../api/apiClient';

export default function TasksPage() {
  const [loading, setLoading] = useState(true);
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    let isMounted = true;
    fetchTasks().then((result) => {
      if (isMounted) {
        setTasks(result);
        setLoading(false);
      }
    });
    return () => {
      isMounted = false;
    };
  }, []);

  const toggleTask = async (id) => {
    let nextStatus = 'pending';
    setTasks((prev) =>
      prev.map((task) => {
        if (task.id !== id) return task;
        nextStatus = task.status === 'completed' ? 'pending' : 'completed';
        return { ...task, status: nextStatus };
      })
    );

    try {
      await updateTaskStatus(id, nextStatus);
    } catch (error) {
      setTasks((prev) =>
        prev.map((task) =>
          task.id === id
            ? { ...task, status: task.status === 'completed' ? 'pending' : 'completed' }
            : task
        )
      );
    }
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
    <>
      <section className="dashboard-header">
        <h2>Task Management</h2>
        <p>Organize and track all operational tasks</p>
      </section>

      <section style={{ marginTop: '2rem' }}>
        {loading ? (
          <p style={{ color: 'var(--text-secondary)' }}>Loading tasks...</p>
        ) : (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          {tasks.map(task => (
            <div key={task.id} style={{
              background: 'var(--bg-tertiary)',
              border: '1px solid var(--border)',
              borderRadius: '10px',
              padding: '1.5rem',
              transition: 'all 0.3s ease',
              opacity: task.status === 'completed' ? 0.7 : 1
            }} className="hover-lift">
              <div style={{ display: 'flex', alignItems: 'start', gap: '1rem', marginBottom: '1rem' }}>
                <button 
                  onClick={() => toggleTask(task.id)}
                  style={{
                    width: '32px',
                    height: '32px',
                    borderRadius: '8px',
                    background: task.status === 'completed' ? '#06a77d' : 'var(--bg-primary)',
                    border: `2px solid ${task.status === 'completed' ? '#06a77d' : 'var(--border)'}`,
                    color: task.status === 'completed' ? 'white' : 'var(--secondary)',
                    fontSize: '0.95rem',
                    cursor: 'pointer',
                    transition: 'all 0.3s ease',
                    fontWeight: '700'
                  }}
                >
                  {getStatusIcon(task.status)}
                </button>
                <div style={{ flex: 1 }}>
                  <h4 style={{ 
                    margin: '0 0 0.25rem 0', 
                    color: 'var(--text-primary)',
                    textDecoration: task.status === 'completed' ? 'line-through' : 'none'
                  }}>{task.title}</h4>
                  <p style={{ margin: '0 0 0.75rem 0', color: 'var(--text-secondary)', fontSize: '0.9rem' }}>{task.description}</p>
                  <div style={{ display: 'flex', gap: '0.75rem', alignItems: 'center' }}>
                    <span style={{
                      padding: '0.35rem 0.75rem',
                      background: task.status === 'in-progress' ? 'rgba(255, 165, 0, 0.2)' : 'rgba(0, 102, 204, 0.2)',
                      borderRadius: '20px',
                      fontSize: '0.75rem',
                      fontWeight: '600',
                      textTransform: 'uppercase',
                      color: task.status === 'in-progress' ? '#ffa500' : 'var(--secondary)'
                    }}>
                      {task.status}
                    </span>
                    <span style={{
                      padding: '0.35rem 0.75rem',
                      background: `${getPriorityColor(task.priority)}20`,
                      borderRadius: '20px',
                      fontSize: '0.75rem',
                      fontWeight: '600',
                      textTransform: 'uppercase',
                      color: getPriorityColor(task.priority)
                    }}>
                      {task.priority}
                    </span>
                  </div>
                </div>
                <span style={{ color: 'var(--text-secondary)', fontSize: '0.85rem', whiteSpace: 'nowrap' }}>📅 {task.dueDate}</span>
              </div>
            </div>
          ))}
        </div>
        )}
      </section>
    </>
  );
}
