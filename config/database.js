import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config();

export const connectDB =() =>mongoose.connect(process.env.MONGO_URI, {
    dbName: 'mern-youtube',
}).then(()=>console.log('DB connected'))
.catch((err)=>console.log(err));


