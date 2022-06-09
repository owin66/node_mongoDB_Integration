const express = require('express');
const path = require('path')
const morgan = require('morgan')
const mongoose = require('mongoose')
const Post = require('./models/post')


const app = express();

app.set('view engine', 'ejs')

const PORT = 3000;

const db = 'mongodb+srv://owin66:Pass321@nodejs.tyesk.mongodb.net/node-blog?retryWrites=true&w=majority'

mongoose
    .connect(db)
    .then((res) => console.log('Connect to DB'))
    .catch((error) => console.log(error));


const createPath = (page) => path.resolve(__dirname, 'ejs-views', `${page}.ejs`)

//функция перехода путей


app.listen(PORT, (error) => {
    error ? console.log(error) : console.log(`listening port ${PORT}`);
});

app.use(morgan(':method :url :status :res[content-length] - :response-time ms'))

app.use(express.urlencoded({extended: false}))

app.use(express.static('styles'));

app.get('/', (req, res) => {
    const title = 'Home';
    res.render(createPath('index'), {title})//путь
})

app.get('/contacts', (req, res) => {
    const title = 'Contacts';
    const contacts = [
        {name: 'YouTube', link: 'http://youtube.com/YauhenKavalchuk'},
        {name: 'Twitter', link: 'http://github.com/YauhenKavalchuk'},
        {name: 'GitHub', link: 'http://twitter.com/YauhenKavalchuk'},
    ];
    res.render(createPath('contacts'), {contacts, title}) //путь
})

app.get('/posts/:id', (req, res) => {
    const title = 'Post';
    const post = {
        id: '1',
        text: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Sapiente quidem provident, dolores, vero laboriosam nemo mollitia impedit unde fugit sint eveniet, minima odio ipsum sed recusandae aut iste aspernatur dolorem.',
        title: ' Post tittle',
        date: '05.05.2021',
        author: 'Yauhen',
    }
    res.render(createPath('post'), {title, post}) //путь
})

app.get('/posts', (req, res) => {
    const title = 'Post';
    const posts = [
        {
            id: '1',
            text: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Sapiente quidem provident, dolores, vero laboriosam nemo mollitia impedit unde fugit sint eveniet, minima odio ipsum sed recusandae aut iste aspernatur dolorem.',
            title: ' Post tittle',
            date: '05.05.2021',
            author: 'Yauhen',
        }
    ]
    res.render(createPath('posts'), {title, posts}) //путь
})
app.post('/add-post', (req, res) => {
    const {title, author, text} = req.body;
    const post = new Post({title, author, text});
    post
        .save()
        .then((result) => res.send(result))
        .catch((error) => {
            console.log(error)
            res.render(createPath('error'), {title: 'Error'})
        })

})

app.get('/add-post', (req, res) => {
    const title = 'Add post';
    res.render(createPath('add-post'), {title}) //путь
})

app.use((req, res) => {
    const title = 'Error Page';
    res
        .status(404) //ошибка
        .render(createPath('error'), {title})//перенаправление на ошибку
})