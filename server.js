import express from 'express';
import pumpsRoutes from './routes/pumps.js';
import cors from 'cors';
import bodyParser from 'body-parser';
import authRoutes from './routes/auth.js';

import dotenv from 'dotenv';
dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());
app.use(bodyParser.json());

app.use('/api/pumps', pumpsRoutes);
app.use('/api/auth', authRoutes);

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
