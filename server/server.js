import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';
import { connectDB } from './config/db.js';
import apiRouter from './routes/api.js';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 5050;

// Middleware
app.use(helmet({
  contentSecurityPolicy: false, // allow external images like dicebear, unsplash, coursera
  crossOriginEmbedderPolicy: false
}));

app.use(cors({
  origin: '*', // allows requests from Vite dev server and production
  methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization', 'x-admin-key']
}));

app.use(morgan('dev'));
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true }));

// Connect to MongoDB
connectDB();

// API Routes
app.use('/api', apiRouter);

// Serve Static Assets in Production if dist folder exists
const distPath = path.join(__dirname, '../dist');
app.use(express.static(distPath));

// Fallback route for SPA client-side routing
app.use((req, res, next) => {
  if (req.path.startsWith('/api')) return next();
  const indexPath = path.join(distPath, 'index.html');
  res.sendFile(indexPath, (err) => {
    if (err) {
      res.status(200).json({
        name: 'Chaitanya Gomaskar Portfolio MERN API',
        status: 'online',
        documentation: '/api/health'
      });
    }
  });
});

// Central Error Handler
app.use((err, req, res, next) => {
  console.error('Unhandled server error:', err);
  res.status(err.status || 500).json({
    success: false,
    message: err.message || 'Internal Server Error'
  });
});

const server = app.listen(PORT, () => {
  console.log(`🚀 MERN Backend Server running on http://localhost:${PORT}`);
  console.log(`📡 Health Check: http://localhost:${PORT}/api/health`);
  console.log(`📫 Contact API: http://localhost:${PORT}/api/contact`);
  console.log(`💼 Projects API: http://localhost:${PORT}/api/projects`);
});

export default app;
