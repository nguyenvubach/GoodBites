// server/server.js

import express from 'express';
import connectDB from './db.js';
import authRoutes from './authRoutes.js';
import cors from 'cors';

console.log('Starting server.js...');

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

console.log('Connecting to MongoDB...');
connectDB();

console.log('Setting up routes...');
app.use('/api', authRoutes);

app.get('/', (req, res) => {
  res.send('API is working');
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
