import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import cookieParser from 'cookie-parser';
import connectDB from './config/db.js';
import authRoutes from './routes/authRoutes.js';
import leadRoutes from './routes/leadRoutes.js';

const app = express();
dotenv.config();
connectDB();

app.use(express.json());
app.use(cookieParser());

app.use(cors({
    origin:  `${process.env.CLIENT_URL}`,
    credentials: true
}));

app.get('/', (req, res) => {
    res.send("Backend is running");
});
app.use('/api/auth', authRoutes);
app.use('/api/leads', leadRoutes);


app.listen(process.env.PORT, ()=> {
    console.log(`Server is running on port ${process.env.PORT}`);
});
