import cors from 'cors';
import dotenv from 'dotenv';
import express from 'express';
import morgan from 'morgan';
import { connectDB } from './config/db.js';
import { errorHandler } from './middleware/errorHandler.js';
import articleRoutes from './routes/articleRoutes.js';
import eventRoutes from './routes/eventRoutes.js';
import { seedArticles } from './seed.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;
const CLIENT_URL = process.env.CLIENT_URL || 'http://localhost:5173';

app.use(cors({ origin: CLIENT_URL }));
app.use(express.json());
app.use(morgan('dev'));

app.get('/api/health', (_req, res) => res.json({ status: 'ok' }));
app.use('/api/articles', articleRoutes);
app.use('/api/events', eventRoutes);
app.use(errorHandler);

const start = async () => {
  await connectDB();
  await seedArticles();
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
};

start().catch((error) => {
  console.error('Failed to start server:', error);
  process.exit(1);
});
