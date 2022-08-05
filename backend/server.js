import express from 'express';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import colors from 'colors';
import userRoute from './routes/userRoute.js';
import authRoute from './routes/authRoute.js';
import chatRoute from './routes/chatRoute.js';

dotenv.config();

const app = express();

// Express body parser
app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ extended: true }));

// Mongo DB Connect
mongoose
   .connect(process.env.MONGO_URI)
   .then(() => console.log('Mongo connected...'.blue.underline))
   .catch(() => console.log('An error occured...'.red.bold));

// API Routes
app.use('/api/users', userRoute);
app.use('/api/auth', authRoute);
app.use('/api/chats', chatRoute);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
