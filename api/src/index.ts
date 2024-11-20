import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';

import { initializeRoutes } from './routes';
import { connectDB } from './config/database';

const PORT = process.env.PORT || 3000;

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

connectDB()
  .then((db) => {
    const router = initializeRoutes(db);

    app.use('/', router);

    app.listen(PORT, () => {
      console.log(`Server is running on http://localhost:${PORT}/`);
    });
  })
  .catch((err) => {
    console.error('Failed to connect to the database', err);
  });
