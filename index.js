const express = require('express');
const createError = require('http-errors');
const app = express();

require('dotenv').config();
require('./helpels/connections_mutil_mongodb');

app.get('/', (req, res, next) => {
    console.log(a);
    res.send('ok')
})

app.use((req, res, next) => {
    next(createError.NotFound('This route does not exist'));
})


app.use((err, req, res, next) => {
    res.json({
        status: err.status || 500,
        message: err.message
    })
})


const post = process.env.PORT || 5000 ;
app.listen(post, () => {
    console.log('http://localhost:3000/');
})