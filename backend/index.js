import connectToMongo from './db.js';
import express, { json } from 'express';
import cors from 'cors';
import authRoutes from './Routes/auth.js';
import notesRoutes from './Routes/notes.js';
import dotenv from 'dotenv';
dotenv.config();
connectToMongo();
const app = express()
const port = process.env.PORT || 5000;

app.use(cors())
app.use(json());
// app.use('/api/auth', require('./Routes/auth')); convert to ES6 import
app.use('/api/auth', authRoutes);
app.use('/api/notes', notesRoutes);
app.use('/uploads', express.static('uploads'));
app.listen(port, () =>
    console.log(`iNotebook listening on port ${port}`)
)
