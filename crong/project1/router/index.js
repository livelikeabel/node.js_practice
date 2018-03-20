var express = require('express');
var app = express();
var router = express.Router();
var path = require('path');
var main = require('./main/main');
var email = require('./email/email');
var join = require('./join/index');
var movie = require('./movie/index');

//url routing
router.get('/', function(req, res){
    console.log('index.js / path loaded');
		res.sendFile(path.join( __dirname , '../public/main.html'));
});

router.use('/main', main);
router.use('/email', email);
router.use('/join', join);
router.use('/movie', movie);

module.exports = router;
