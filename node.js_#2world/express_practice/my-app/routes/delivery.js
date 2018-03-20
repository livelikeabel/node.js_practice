var express = require('express');
var router = express.Router();

/* GET delivery page */
router.get('/', function(req, res, next) {
    res.render('delivery', { title: 'delivery'});
})

module.exports = router;
