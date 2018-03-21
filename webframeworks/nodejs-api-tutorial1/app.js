const express = require('express');
const bodyParser = require('body-parser');
const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use('/users', require('./api/user'));

app.get('/', (req, res) => {
  res.send('Hello World!\n');
});

app.listen(3000, () => {
  console.log('Example app listening on port 3000!');
});

module.exports = app;
