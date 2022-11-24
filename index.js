const express = require('express');
const createError = require('http-errors');
const client  = require('./helpels/connections_redis');
const { userRouter } = require('./Routes/User.router');
const app = express();

require('dotenv').config();
require('./helpels/connections_mongodb');

app.use(express.json());
app.use(express.urlencoded({ extended: true }));


app.get('/', (req, res, next) => {
    res.send('ok');
})

app.use('/user', userRouter);

app.use((req, res, next) => {
    next(createError.NotFound('This route does not exist'));
})


app.use((err, req, res, next) => {
    res.json({
        status: err.status || 500,
        message: err.message
    })
})


const post = process.env.PORT || 5000;
app.listen(post, () => {
    console.log('http://localhost:3000/');
})