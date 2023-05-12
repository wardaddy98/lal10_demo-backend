import cors from 'cors';
import express from 'express';
import mongoose from 'mongoose';
import { DB_URI, PORT } from './src/constants.js';
import mainRouter from './src/routes/routes.js';
const app = express();

try {
  mongoose.connect(DB_URI).then(() => {
    console.log('Database connection established');
  });
} catch (err) {
  console.log('err mongo');
}

app.use(
  cors({
    origin: '*',
  }),
);
app.use(express.json());

app.use('/', mainRouter);

app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
