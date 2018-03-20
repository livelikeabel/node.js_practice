var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var session = require('express-session');
var fs = require("fs");

app.set('views', __dirname + '/views');//서버가 읽을 수 있도록 HTML의 위치를 정의해줍니다.
app.set('view engine', 'ejs');//6,7라인 : 서버가 HTML 렌더링을 할 때,EJS엔진을 사용하도록 설정합니다.
app.engine('html', require('ejs').renderFile);


var server = app.listen(3000, function() {
  console.log("Express server has started on port 3000");
});

app.use(express.static('public'));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(session({
  secret: '@#@$MYSIGN#@$#$', //secret – 쿠키를 임의로 변조하는것을 방지하기 위한 sign 값 입니다. 원하는 값을 넣으면 됩니다.
  resave: false, //resave – 세션을 언제나 저장할 지 (변경되지 않아도) 정하는 값입니다. express-session documentation에서는 이 값을 false 로 하는것을 권장하고 필요에 따라 true로 설정합니다.
  saveUninitialized: true //saveUninitialized – uninitialized 세션이란 새로 생겼지만 변경되지 않은 세션을 의미합니다. Documentation에서 이 값을 true로 설정하는것을 권장합니다.
}));


var router = require('./router/main')(app, fs);//라우터 모듈인 main.js를 불러와서 app에 전달해줍니다. // fs에도 전달해 주는건가? ㅋㅋ
