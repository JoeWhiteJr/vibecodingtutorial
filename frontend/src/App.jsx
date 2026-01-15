import { useState, useEffect } from 'react';
import ProjectList from './components/ProjectList';

const styles = {
  app: {
    fontFamily: 'system-ui, -apple-system, sans-serif',
    maxWidth: '800px',
    margin: '0 auto',
    padding: '20px',
  },
  header: {
    borderBottom: '2px solid #333',
    paddingBottom: '10px',
    marginBottom: '20px',
  },
  form: {
    display: 'flex',
    gap: '10px',
    marginBottom: '20px',
  },
  input: {
    flex: 1,
    padding: '10px',
    fontSize: '16px',
    border: '1px solid #ccc',
    borderRadius: '4px',
  },
  button: {
    padding: '10px 20px',
    fontSize: '16px',
    backgroundColor: '#007bff',
    color: 'white',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer',
  },
};

function App() {
  const [projects, setProjects] = useState([]);
  const [newProject, setNewProject] = useState('');

  useEffect(() => {
    fetchProjects();
  }, []);

  const fetchProjects = async () => {
    const res = await fetch('/api/projects');
    const data = await res.json();
    setProjects(data);
  };

  const addProject = async (e) => {
    e.preventDefault();
    if (!newProject.trim()) return;

    await fetch('/api/projects', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name: newProject, description: '' }),
    });

    setNewProject('');
    fetchProjects();
  };

  return (
    <div style={styles.app}>
      <h1 style={styles.header}>Project Manager</h1>

      <form onSubmit={addProject} style={styles.form}>
        <input
          style={styles.input}
          type="text"
          placeholder="New project name..."
          value={newProject}
          onChange={(e) => setNewProject(e.target.value)}
        />
        <button style={styles.button} type="submit">Add Project</button>
      </form>

      <ProjectList projects={projects} onUpdate={fetchProjects} />
    </div>
  );
}

export default App;
