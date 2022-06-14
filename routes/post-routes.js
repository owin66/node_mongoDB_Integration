const express = require('express')
const router = express.Router()
const {
    getPost,
    deletePost,
    getEditPost,
    editPost,
    getPosts,
    getAddPost,
    addPost,
} = require('../controllers/post-controller')


router.get('/posts/:id', getPost)
router.delete('/posts/:id', deletePost)
router.get('/edit/:id', getEditPost)
router.put('/edit/:id', editPost)
router.get('/posts', getPosts)
router.post('/add-post', getAddPost)
router.get('/add-post', addPost)

module.exports = router;