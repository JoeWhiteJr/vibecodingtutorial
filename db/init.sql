CREATE TABLE projects (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    description TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE tasks (
    id SERIAL PRIMARY KEY,
    project_id INTEGER REFERENCES projects(id) ON DELETE CASCADE,
    title VARCHAR(255) NOT NULL,
    status VARCHAR(50) DEFAULT 'pending',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Insert sample data
INSERT INTO projects (name, description) VALUES
    ('Sample Project', 'A sample project to get started');

INSERT INTO tasks (project_id, title, status) VALUES
    (1, 'Set up development environment', 'completed'),
    (1, 'Design database schema', 'completed'),
    (1, 'Build API endpoints', 'in_progress'),
    (1, 'Create frontend UI', 'pending');
