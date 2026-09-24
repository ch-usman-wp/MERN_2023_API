import express from 'express';
import userRoutes from './routes/user.js';
import { connectDB } from './config/database.js';
import cookieparser from 'cookie-parser';
import  blogRouter  from './routes/blog.routs.js';
import dotenv from 'dotenv';
import cors from 'cors';


const app = express();
app.use(cookieparser());

dotenv.config();

connectDB();

app.use(express.json());

app.use(cors({
    origin: [process.env.FRONTEND_URL],
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    credentials: true,
}));
 
app.use('/api/users', userRoutes);

app.use('/api/blog', blogRouter);

app.use((error, req, res, next) => {
    if(error instanceof SyntaxError && error.status === 400 && error.type === 'entity.parse.failed') {
        return res.status(400).json({
            success: false,
            message: 'Invalid JSON. Send name, email, and password as a JSON object.'
        });
    }

    next(error);
});

const port = process.env.PORT || 4000;
app.listen(port, ()=>console.log(`server is running ${port}`))