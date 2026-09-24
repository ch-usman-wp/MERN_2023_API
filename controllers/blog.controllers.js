 import { Blog } from '../models/blog.model.js'


 export const createBlog = async (req, res) =>{
    const {title, discription, imgUrl} = req.body

    const blog = await Blog.create({
        title,
        discription,
        imgUrl,
        user: req.user
    })     
    res.json({
        sucess: true,
        message: "creata a new blog ",
        blog
    })

 }

 export const myBlog = async (req, res) =>{
    const userid = req.user._id;
    const blogs = await Blog.find({user: userid});

    res.status(200).json({
        sucess: true,
        message: "myBlog blog",
        blogs
    })

 }

 export const updateBlog = async (req, res) =>{
    const {title, discription, imgUrl} = req.body;
    const updatedBlog = await Blog.findByIdAndUpdate(req.params.id, {
        title,
        discription,
        imgUrl
    }, {new: true});
    res.status(200).json({
        sucess: true,
        message: "updateBlog blog ",
        updatedBlog
    }) 
    if(!updatedBlog){
        return res.status(404).json({
            success: false,
            message: "Blog not found"
        });
    }

 }

 export const deleteBlog =async (req, res) =>{
    const blogId = req.params.id;

    const deletedBlog = await Blog.findByIdAndDelete(blogId);
    
    res.json({
        sucess: true,
        message: "deleteBlogblog ",
        deletedBlog
        
    })

 }