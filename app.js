require('dotenv').config();
var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const mongoose = require('mongoose');

mongoose.connect(process.env.MONGODB_URL);
const db = mongoose.connection;

// set routes
var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// set mongo connection
db.on('error', function(){
  console.log('connection failed :(')
});
db.once('open', function(){
  console.log("connected :)")
});

// logger setup
app.use(logger('dev'));
// json setup
app.use(express.json());
// set urlencoded
app.use(express.urlencoded({ extended: true }));
// cookieParser setup
app.use(cookieParser());
// static file setup
app.use(express.static(path.join(__dirname, 'public')));

// define routes
app.use('/', indexRouter);
app.use('/users', usersRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error', {title: err.status});
});

module.exports = app;
