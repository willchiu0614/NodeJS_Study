var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var cors = require("cors");
const bcrypt = require('bcrypt') // 雜湊加密
const jwt = require('jsonwebtoken') // jwt加密token

var indexRouter = require('./Controller/index');

var pageController =require('./Controller/pageController');
var routeController =require('./Controller/routeController');
var api =require('./Controller/api');

var app = express();//實例化express

// view engine setup
app.set('views', path.join(__dirname, 'View'));
app.set('view engine', 'ejs');

//跨域處理
app.use(cors());

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(__dirname+'/public/javascripts'));

//app.use('/', indexRouter);
app.use('/',pageController);
app.use('/home',pageController);
app.use('/db',routeController);
app.use('/api',api);
app.use('/assests', express.static(__dirname + '/Assest'));//資源資料夾路徑
app.use('/js', express.static(__dirname + '/ViewController'));//處理前端邏輯資料夾路徑

//----------------測試用code-----------------

//----------------測試用code-end-----------------

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
  res.render('error');
});



module.exports = app;
