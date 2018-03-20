var express = require('express');
var app = express();
var bodyParser = require('body-parser');

app.listen(4000, function(req, res){
    console.log("server is running http://127.0.0.1:4000");
});

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));

app.get('/', function(req, res){
    res.sendFile("/Users/abel/project/plating/node.js_practice/crong/project1_practice2/public/form.html");
});

app.post('/ajax_send_search', function(req, res){
    console.log(req.body.search);
    var responseData = {'result' : 'ok', 'search' : req.body.search};
    res.json(responseData);
});
