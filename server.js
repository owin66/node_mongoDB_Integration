const express = require('express');
const chalk = require('chalk');
const morgan = require('morgan')
const mongoose = require('mongoose')
const methodOverride = require('method-override')
const postRoutes = require('./routes/post-routes')
const postApiRoutes = require('./routes/api-post-routes')
const contactRoutes = require('./routes/contact-routes')
const createPath = require('./helpers/create-path')

const errorMsg = chalk.bgKeyword('white').redBright;
const successMsg = chalk.bgKeyword('green').white;


const app = express();


app.set('view engine', 'ejs')

const PORT = 3000;

const db = 'mongodb+srv://owin66:Pass321@nodejs.tyesk.mongodb.net/node-blog?retryWrites=true&w=majority'

mongoose
    .connect(db, {useNewUrlParser: true, useUnifiedTopology: true})
    .then((res) => console.log(successMsg('Connect to DB')))
    .catch((error) => console.log(errorMsg(error)));


//функция перехода путей


app.listen(PORT, (error) => {
    error ? console.log(errorMsg(error)) : console.log(successMsg(`listening port ${PORT}`));
});

app.use(morgan(':method :url :status :res[content-length] - :response-time ms'))

app.use(express.urlencoded({extended: false}))

app.use(express.static('styles'));

app.use(methodOverride('_method'))


app.get('/', (req, res) => {
    const title = 'Home';
    res.render(createPath('index'), {title})//путь
})

app.use(postRoutes);//подключение
app.use(contactRoutes);
app.use(postApiRoutes)

app.use((req, res) => {
    const title = 'Error Page';
    res
        .status(404) //ошибка
        .render(createPath('error'), {title})//перенаправление на ошибку
})