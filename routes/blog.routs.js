import express from 'express';
import { isAuthenticated } from '../middlewares/auth.js';
import { createBlog, myBlog, updateBlog, deleteBlog, getAllBlogs, getBlogById } from '../controllers/blog.controllers.js'; 

const router = express.Router();

router.post('/new', isAuthenticated, createBlog );
router.get('/myblogs', isAuthenticated, myBlog );
router.put('/:id', isAuthenticated, updateBlog );
router.delete('/:id', isAuthenticated, deleteBlog );
router.get('/allBlogs', getAllBlogs ); 
router.get(['/id/:id', '/idbg:id'], isAuthenticated, getBlogById );

export default router;