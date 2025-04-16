
import dotenv from 'dotenv';
dotenv.config();

import express from 'express';
import mongoose from 'mongoose';
import certificateRouter from './routes/certificate';

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use('/certificate', certificateRouter);

mongoose.connect(process.env.MONGO_URI || '')
  .then(() => {
    console.log('Connected to MongoDB');
    app.listen(PORT, () => {
      console.log(`Server is running on PORT ${PORT}`);
    });
  })
  .catch(err => console.error(err));
