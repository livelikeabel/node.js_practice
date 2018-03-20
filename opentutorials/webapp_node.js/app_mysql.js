var express = require('express');
var bodyParser = require('body-parser');
var app = express();
var fs = require('fs');
var mysql = require('mysql');
var conn = mysql.createConnection({
    host     : 'localhost',
    user     : 'root',
    password : 'dmltjd11',
    database : 'o2'
});
app.use(bodyParser.urlencoded({ extended: false }));
app.set('views', './views_mysql');
app.set('view engine', 'ejs');

app.get('/topic/add', function(req, res){
    var sql = 'SELECT id,title FROM topic';
    conn.query(sql, function(err, topics, fields){
      if(err){
        console.log(err);
        res.status(500).send('Internal Server Error')
      }
        res.render('add', { topics: topics });
    });
});
app.post('/topic/add', function(req, res){
    var title = req.body.title;
    var description = req.body.description;
    var author = req.body.author;
    var sql = 'INSERT INTO topic (title, description, author) VALUES(?, ?, ?)';
    var params = [title, description, author];
    conn.query(sql, params, function(err, result, fields){
        if(err) {
          console.log(err);
          res.status(500).send('Internal Server Error');
        }
        console.log('The file has been saved!');
        res.redirect('/topic/'+result.insertId);
    });
});
app.get(['/topic/:id/edit'], function(req, res){
    var sql = 'SELECT id,title FROM topic';
    conn.query(sql, function(err, topics, fields){
      var id = req.params.id; // request받은 id값
      if(id){
        var sql = 'SELECT * FROM topic WHERE id=?';
        conn.query(sql, [id], function(err, topic, fields){//[id] : 사용자로부터 받은 id
          if(err) {
            console.log(err);
            res.status(500).send('Internal Server Error');
          } else {
            res.render('edit', {topics : topics, topic : topic[0] });
          }
        });
      } else {
        console.log(err);
        res.send('There is no id.');
      }
    });
});
app.post('/topic/:id/edit', function(req, res){
    var sql = 'UPDATE topic SET title=?, description=?, author=? WHERE id=?';
    var title = req.body.title;
    var description = req.body.description;
    var author = req.body.author;
    var id = req.params.id;
    conn.query(sql, [title, description, author, id], function(err, result, fields){
      if(err) {
        console.log(err);
        res.status(500).send('Internal Server Error');
      } else {
        res.redirect('/topic/'+id)
      }
    });
});
app.get('/topic/:id/delete', function(req, res){
    var sql = 'SELECT id,title FROM topic';
    var id = req.params.id;
    conn.query(sql, function(err, topics, fields){
      var sql = 'SELECT * FROM topic WHERE id=?';
      conn.query(sql, [id], function(err, topic){
          if(err){
            console.log(err);
            res.status(500).send('Internal Sever Error');
          } else {
            if(topic.length === 0){
              console.log('There is no record');
              res.status(500).send('Internal Sever Error');
            } else {
              res.render('delete', {topics:topics, topic:topic[0]});
            }
          }
      });
  });
});
app.post('/topic/:id/delete', function(req, res){
    var id = req.params.id;
    var sql = 'DELETE FROM topic WHERE id=?';
    conn.query(sql, [id], function(err, result){
      if(err) console.log(err);
      res.redirect('/topic');
    });
});

app.get(['/topic','/topic/:id'], function(req, res){
    var sql = 'SELECT id,title FROM topic';
    conn.query(sql, function(err, topics, fields){
      var id = req.params.id; // request받은 id값
      if(id){
        var sql = 'SELECT * FROM topic WHERE id=?';
        conn.query(sql, [id], function(err, topic, fields){//[id] : 사용자로부터 받은 id
          if(err) {
            console.log(err);
            res.status(500).send('Internal Server Error');
          } else {
            res.render('view', {topics : topics, topic : topic[0] });
          }
        });
      } else {
        res.render('view', {topics : topics, topic : undefined })
      }
    });
});
app.listen(3000, function(){
    console.log("Connected localhost:3000");
});
