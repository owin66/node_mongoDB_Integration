const Post = require('../models/post');
const createPath = require('../helpers/create-path')

const getPost = (req,res) => {
    const title = 'Post';
    Post
        .findById(req.params.id)
        .then((post) => res.render(createPath('post'), {post, title}))
        .catch((error) => {
            console.log(error)
            res.render(createPath('error'), {title: 'Error'})
        })
}

module.exports={
    getPost,
}