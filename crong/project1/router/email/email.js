var express = require('express');
var app = express();
var router = express.Router();
var path = require('path');
var mysql = require('mysql');

// DATABASE SETTING
var connection = mysql.createConnection({
		host : 'localhost',
		port : 3306,
		user : 'root',
		password : 'dmltjd11',
		database : 'jsman'
});

connection.connect();

//Router !!
router.post('/form', function(req, res){
		console.log(req.body.email);
		res.render('email.ejs', {'email': req.body.email});
});

router.post('/ajax', function(req, res){
		var email = req.body.email;
		var responseData = {};//json데이터를 주기위해 초기화 해놓는다.

		var query = connection.query('select name from user where email="'+ email +'"', function(err, rows){
			if(err) throw err;
			if(rows[0]) {
				console.log(rows[0]);
				responseData.result = "ok";
				responseData.name = rows[0].name;
			} else {
				responseData.result = "none";
				responseData.name = "";
			}
			res.json(responseData);
		});
});

module.exports = router;
