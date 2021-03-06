var express = require('express');
var app = express();
var morgan = require('morgan');
var bodyParser = require('body-parser');
var user = require('./api/user');
var menu = require('./api/menu');
var chef = require('./api/chef');

if (process.env.NODE_ENV !== 'test') {
    app.use(morgan('dev'));
}

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use('/users', user);
app.use('/menus', menu);
app.use('/chefs', chef);

module.exports = app;
