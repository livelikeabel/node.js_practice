var express = require('express');
var router = express.Router();
var jd = require("../jdata.json");
/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index_plating', { title: 'Plating', menu1: '수란을 얹은 김퓨레 라이스', jdata: jd });
});

module.exports = router;
