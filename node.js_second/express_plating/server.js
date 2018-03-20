var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var session = require('express-session');//Express 의 이전 버전에서는 cookie-parser 모듈도 불러와야했지만, 이젠 express-session 모듈이 직접 쿠키에 접근하므로 cookie-parser 를 더이상 사용 할 필요가 없습니다.
var fs = require("fs");//Node.js 에 내장되어있는 fs 모듈도 불러왔는데요, 이는 나중에 파일을 열기 위함이랍니다.

app.set('views', __dirname + '/views');// 서버가 읽을 수 있도록 HTML의 위치를 정의해줍니다.
app.set('view engine', 'ejs');//                 서버가 HTML렌더링을 할 떄, EJS 엔진을 사용하도록 설정합니다.
app.engine('html', require('ejs').renderFile); //서버가 HTML렌더링을 할 떄, EJS 엔진을 사용하도록 설정합니다.

var server = app.listen(3000, function(){
    console.log("Express server has started on port 3000");
});

app.use(express.static('public'));// 서버에서 정적파일을 다루기 위해서 express.static()메소드를 사용하면 된다.

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: true
}));
app.use(session({
    secret: '@#@$MYSIGN#@$#$',//쿠키를 임의로 변조하는것을 방지하기 위한 sign 값 입니다. 원하는 값을 넣으면 됩니다.
    resave: false, //세션을 언제나 저장할 지 (변경되지 않아도) 정하는 값입니다. express-session documentation에서는 이 값을 false 로 하는것을 권장하고 필요에 따라 true로 설정합니다.
    saveUninitialized: true //uninitialized 세션이란 새로 생겼지만 변경되지 않은 세션을 의미합니다. Documentation에서 이 값을 true로 설정하는것을 권장합니다.
}));

var router = require('./router/main')(app, fs);// 라우터 모듈인 main.js를 불러와서 app에 전달해 줍니다.  이 코드가 bodyParser  설정 아래부분에 있다면 제대로 작동하지 않는답니다.
