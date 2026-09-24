 import mongoose from 'mongoose';


const blogschema = new mongoose.Schema({
    title:{
        type: String,
        required: true,
    },
    discription:{
        type: String,
        required: true,
    },
    imgUrl:{
        type: String,
        required: true,
    },
    user:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    createdat:{
        type: Date,
        default: Date.now,
    },
})

export const Blog  = mongoose.model('Blog', blogschema);