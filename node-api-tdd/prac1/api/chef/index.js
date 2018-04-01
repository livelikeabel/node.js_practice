const express = require('express');
const router = express.Router();
const ctrl = require('./chef.ctrl');





router.post('/', ctrl.create);


module.exports = router;
