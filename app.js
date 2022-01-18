require('dotenv').config();
const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const session = require('express-session');
const mongoose = require('mongoose');

// mongodb connection
mongoose.connect(process.env.MONGODB_URL);
const db = mongoose.connection;

// set routes
var loginRouter = require('./routes/login.routes');
var registerRouter = require('./routes/register.routes');
var indexRouter = require('./routes/index');
var musicRouter = require('./routes/music.routes');
var photoRouter = require('./routes/photo.routes');
var videoRouter = require('./routes/video.routes');
var otherRouter = require('./routes/other.routes');

// Express instance
var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// set mongo connection
db.on('error', function () {
  console.log('connection failed :(')
});
db.once('open', function () {
  console.log("database connected :)")
});

// set session
app.use(session({
  secret: process.env.APP_SECRET,
  resave: false,
  saveUninitialized: true,
  cookie: { secure: true, maxAge: 60000 },
}));

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
app.use('/login', loginRouter)
app.use('/register', registerRouter)
app.use('/musics', musicRouter);
app.use('/photos', photoRouter);
app.use('/videos', videoRouter);
app.use('/others', otherRouter);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error', { title: err.status });
});

module.exports = app;
