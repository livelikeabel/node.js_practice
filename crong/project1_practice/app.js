var express = require('express');
var app = express();
var bodyParser = require('body-parser');

app.listen(8080, function(){
    console.log("Server running at 8080");
});

app.use(express.static('public'));// 정적파일들을 사용할 수 있게해준다.
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));

//url routing
app.get('/', function(req, res){
    res.sendFile( __dirname + '/public/search.html');// __dirname은 project1_practice의 주소를 가리킨다.
});

// app.post('/search_post', function(req, res){
//     res.send("success");
// });

app.post('/ajax_send_email', function(req, res){
    console.log("success_post");
    console.log(req.body.search);
    var search = req.body.search;
    if(search === "pasta"){
      res.json({'result': 'ok', 'search' : 'pasta is very tasty good'});
    }
    var responseData = {'result': 'ok', 'search' : req.body.search };
    res.json(responseData);
});
