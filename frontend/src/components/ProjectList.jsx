import { useState, useEffect } from 'react';

const styles = {
  project: {
    border: '1px solid #ddd',
    borderRadius: '8px',
    padding: '15px',
    marginBottom: '15px',
  },
  projectHeader: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: '10px',
  },
  projectName: {
    margin: 0,
    fontSize: '18px',
  },
  taskList: {
    listStyle: 'none',
    padding: 0,
    margin: '10px 0',
  },
  task: {
    display: 'flex',
    alignItems: 'center',
    gap: '10px',
    padding: '8px',
    backgroundColor: '#f5f5f5',
    borderRadius: '4px',
    marginBottom: '5px',
  },
  taskTitle: {
    flex: 1,
  },
  statusBadge: (status) => ({
    padding: '2px 8px',
    borderRadius: '12px',
    fontSize: '12px',
    backgroundColor: status === 'completed' ? '#28a745' : status === 'in_progress' ? '#ffc107' : '#6c757d',
    color: status === 'in_progress' ? '#000' : '#fff',
  }),
  addTaskForm: {
    display: 'flex',
    gap: '10px',
    marginTop: '10px',
  },
  input: {
    flex: 1,
    padding: '8px',
    border: '1px solid #ccc',
    borderRadius: '4px',
  },
  smallButton: {
    padding: '8px 12px',
    fontSize: '14px',
    backgroundColor: '#28a745',
    color: 'white',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer',
  },
  select: {
    padding: '4px',
    borderRadius: '4px',
    border: '1px solid #ccc',
  },
};

function ProjectList({ projects, onUpdate }) {
  return (
    <div>
      {projects.length === 0 ? (
        <p>No projects yet. Create one above!</p>
      ) : (
        projects.map((project) => (
          <ProjectCard key={project.id} project={project} onUpdate={onUpdate} />
        ))
      )}
    </div>
  );
}

function ProjectCard({ project, onUpdate }) {
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState('');
  const [expanded, setExpanded] = useState(false);

  useEffect(() => {
    if (expanded) {
      fetchTasks();
    }
  }, [expanded]);

  const fetchTasks = async () => {
    const res = await fetch(`/api/projects/${project.id}/tasks`);
    const data = await res.json();
    setTasks(data);
  };

  const addTask = async (e) => {
    e.preventDefault();
    if (!newTask.trim()) return;

    await fetch(`/api/projects/${project.id}/tasks`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ title: newTask }),
    });

    setNewTask('');
    fetchTasks();
  };

  const updateStatus = async (taskId, status) => {
    await fetch(`/api/tasks/${taskId}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ status }),
    });
    fetchTasks();
  };

  return (
    <div style={styles.project}>
      <div style={styles.projectHeader}>
        <h3 style={styles.projectName}>{project.name}</h3>
        <button
          onClick={() => setExpanded(!expanded)}
          style={{ ...styles.smallButton, backgroundColor: '#6c757d' }}
        >
          {expanded ? 'Hide Tasks' : 'Show Tasks'}
        </button>
      </div>

      {expanded && (
        <>
          <ul style={styles.taskList}>
            {tasks.map((task) => (
              <li key={task.id} style={styles.task}>
                <span style={styles.taskTitle}>{task.title}</span>
                <select
                  style={styles.select}
                  value={task.status}
                  onChange={(e) => updateStatus(task.id, e.target.value)}
                >
                  <option value="pending">Pending</option>
                  <option value="in_progress">In Progress</option>
                  <option value="completed">Completed</option>
                </select>
                <span style={styles.statusBadge(task.status)}>{task.status}</span>
              </li>
            ))}
          </ul>

          <form onSubmit={addTask} style={styles.addTaskForm}>
            <input
              style={styles.input}
              type="text"
              placeholder="New task..."
              value={newTask}
              onChange={(e) => setNewTask(e.target.value)}
            />
            <button style={styles.smallButton} type="submit">Add Task</button>
          </form>
        </>
      )}
    </div>
  );
}

export default ProjectList;
