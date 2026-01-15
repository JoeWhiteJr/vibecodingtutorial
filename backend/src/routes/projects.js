import { Router } from 'express';
import pool from '../db.js';

const router = Router();

// Get all projects
router.get('/projects', async (req, res) => {
  const result = await pool.query('SELECT * FROM projects ORDER BY created_at DESC');
  res.json(result.rows);
});

// Create a project
router.post('/projects', async (req, res) => {
  const { name, description } = req.body;
  const result = await pool.query(
    'INSERT INTO projects (name, description) VALUES ($1, $2) RETURNING *',
    [name, description]
  );
  res.status(201).json(result.rows[0]);
});

// Get tasks for a project
router.get('/projects/:id/tasks', async (req, res) => {
  const { id } = req.params;
  const result = await pool.query(
    'SELECT * FROM tasks WHERE project_id = $1 ORDER BY created_at',
    [id]
  );
  res.json(result.rows);
});

// Create a task
router.post('/projects/:id/tasks', async (req, res) => {
  const { id } = req.params;
  const { title } = req.body;
  const result = await pool.query(
    'INSERT INTO tasks (project_id, title) VALUES ($1, $2) RETURNING *',
    [id, title]
  );
  res.status(201).json(result.rows[0]);
});

// Update task status
router.patch('/tasks/:id', async (req, res) => {
  const { id } = req.params;
  const { status } = req.body;
  const result = await pool.query(
    'UPDATE tasks SET status = $1 WHERE id = $2 RETURNING *',
    [status, id]
  );
  res.json(result.rows[0]);
});

export default router;
