const express = require('express');
const Blog = require('../model/blogModel');
const router = express.Router();
const jwt=require('jsonwebtoken');


router.use(express.json());
function verifytoken(req,res,next){
    let token=req.headers.token;
    try{
        if(!token) throw 'unauthrized access';
        else{
            let payload= jwt.verify(token,'blogApp');
            if(!payload) throw "Unauthrized"
            next();
        }
    }catch (error){
        console.log(error);
    }
}
// Get all blogs
router.get('/blogs', verifytoken, async (req, res) => {
    try {
        const blogs = await Blog.find();
        res.status(200).json(blogs);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});


// Create a new blog
router.post('/addblog', verifytoken,async (req, res) => {
    try {
        const newBlog = new Blog(req.body);
        await newBlog.save();
        res.status(201).json(newBlog);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});






// Update a blog by ID
router.put('/editblog/:id', verifytoken,async (req, res) => {
    try {
        const updatedBlog = await Blog.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!updatedBlog) return res.status(404).json({ error: 'Blog not found' });
        res.status(200).json(updatedBlog);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

// Delete a blog by ID
router.delete('/deleteblog/:id', async (req, res) => {
    try {
        const deletedBlog = await Blog.findByIdAndDelete(req.params.id);
        if (!deletedBlog) return res.status(404).json({ error: 'Blog not found' });
        res.status(200).json({ message: 'Blog deleted successfully' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

module.exports = router;
