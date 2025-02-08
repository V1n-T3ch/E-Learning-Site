import express, { json } from 'express';
import connectDB from './config/database';

const app = express();

// Connect to MongoDB
connectDB();

// Middleware
app.use(json());

// Define routes
app.use('/api/users', require('./routes/users'));
app.use('/api/courses', require('./routes/courses'));

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));