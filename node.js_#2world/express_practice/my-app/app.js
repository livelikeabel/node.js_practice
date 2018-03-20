var express = require('express');
var path = require('path');
var logger = require('morgan');//morgan: 클라이언트의 HTTP 요청 정보를 로깅하기 위한 모듈
var cookieParser = require('cookie-parser');//cookie-parser: 접속한 클라이언트의 쿠키 정보에 접근하기 위한 모듈
var bodyParser = require('body-parser');//body-parser: 클라이언트의 HTTP 요청 중 POST 요청의 바디 데이터에 접근하기 위한 모듈
var index = require('./routes/index');
var about = require('./routes/about-us');
var howToUse = require('./routes/how-to-use');
var delivery = require('./routes/delivery');
var app_sns = require('./routes/app_sns');
var users = require('./routes/users');

var app = express();

app.locals.money="199999999 won";//locals로 전역변수(?) 설정 가능하다.// 이거 왜 주석 처리 하면 에러가 날까....
//app.locals.jdata=require("./jdata.json");//web페이지 어디에서든 사용할 수 있다.
// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));//데이터가 어떻게 로그되고
app.use(bodyParser.json());// 파싱 되는지.
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', index);
app.use('/about-us', about);
app.use('/how-to-use', howToUse);
app.use('/delivery', delivery);
app.use('/app_sns', app_sns);
app.use('/users', users);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
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
