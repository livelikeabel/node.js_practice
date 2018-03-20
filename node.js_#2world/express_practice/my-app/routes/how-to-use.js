var express = require('express');
var router = express.Router();

/* GET how-to-use page. */
router.get('/', function(req, res, next) {
    res.render('how-to-use', { title: 'how-to-use'});
});

module.exports = router;
