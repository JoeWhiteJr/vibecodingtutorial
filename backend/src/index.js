import express from 'express';
import cors from 'cors';
import projectRoutes from './routes/projects.js';

const app = express();
const PORT = 3000;

app.use(cors());
app.use(express.json());

app.use('/api', projectRoutes);

app.get('/health', (req, res) => {
  res.json({ status: 'ok' });
});

app.listen(PORT, '0.0.0.0', () => {
  console.log(`Backend running on port ${PORT}`);
});
