const express = require('express');
const path = require('path')
const morgan = require('morgan')
const mongoose = require('mongoose')
const methodOverride = require('method-override')
const postRouters = require('./routes/post-routes')
const contactRoutes = require('./routes/contact-routes')

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

app.use(methodOverride('_method'))

app.use(postRouters);//подключение
app.use(contactRoutes);

app.get('/', (req, res) => {
    const title = 'Home';
    res.render(createPath('index'), {title})//путь
})


app.use((req, res) => {
    const title = 'Error Page';
    res
        .status(404) //ошибка
        .render(createPath('error'), {title})//перенаправление на ошибку
})