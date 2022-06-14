const express = require('express')

const {
    getPost,
    deletePost,
    editPost,
    getPosts,
    addPost,
} = require('../controllers/post-controller')

const router = express.Router();

//GET ALL POSTS
router.get('/api/posts', getPosts)
//ADD NEW POSTS
router.get('/api/post', addPost)
//GET POST BY ID
router.get('/api/post/:id', getPost)
//DELETE POST BY ID
router.delete('api/post/:id', deletePost)
//UPDATE POST BY ID
router.put('/api/post/:id', editPost)


module.exports = router;