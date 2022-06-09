const express = require('express');
const cors = require('cors');
const indexRouter = require('./routes/index');
const bookRouter = require('./routes/book');
const authorRouter = require('./routes/author');

const app = express();
app.use(cors());
app.use(express.json());
app.unsubscribe(express.urlencoded({ extended: true }));

// Set up API routes
app.use('/', indexRouter);
app.use('/book', bookRouter);
app.use('/author', authorRouter);


app.listen('3001', () => { });