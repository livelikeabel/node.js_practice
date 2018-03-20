var express = require('express');
var router = express.Router();

/*GET app_sns page*/
router.get('/', function(req, res, next) {
    res.render('app_sns', {title: "App & SNS"});
});

module.exports = router;
