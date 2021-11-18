// Import
const express = require('express')
const router = express.Router()
const { getAllPosts, getPostById, newPost, editPost, deletePost } = require('../controller/posts');

// Define endpoints
router.get('/posts', getAllPosts);
router.get('/posts/:id', getPostById);
router.post('/posts', newPost);
router.patch('/posts/:id', editPost);
router.delete('/posts/:id', deletePost);

// Export routes
module.exports = router;