var express = require('express');
var bodyParser = require('body-parser');
var app = express();
var fs = require('fs');
var mysql = require('mysql');

var conn = mysql.createConnection({
    host     : 'localhost',
    user     : 'root',
    password : 'dmltjd11',
    database : 'plating_abel'
});

app.use(bodyParser.urlencoded({ extended: false }));

app.set('views', './views');
app.set('view engine', 'ejs');

app.get('/menus/add', function(req, res){ //순서가 중요한것 같다...
    var sql = 'SELECT id,name FROM recipe';
    conn.query(sql, function(err, recipes, fields){
      if(err){
        console.log(err);
        res.status(500).send('Internal Server Error');
      }
      res.render("add", {menus:recipes});
    });
});

app.post('/menus/add', function(req, res){
    var name = req.body.name;
    var description = req.body.description;
    var chef = req.body.chef;
    var sql = 'INSERT INTO recipe (name, description, chef) VALUES(?, ?, ?)';
    var params = [name, description, chef];
    conn.query(sql, params, function(err, rows, fields){
        if(err) {
          console.log(err);
          res.status(500).send('Internal Server error');
        }
        console.log('The file has been saved!');
        // res.redirect('/menus/'+rows.insertId);
        res.send('success');
    });
});

app.get(['/menus', '/menus/:id'],function(req, res){
    var sql = 'SELECT id,name FROM recipe';
    conn.query(sql, function(err, recipes, fields){
        var id = req.params.id;
        if(id){
          var sql = 'SELECT * FROM recipe WHERE id=?'
          conn.query(sql, [id], function(err, recipe, fields){
              if(err) {
                  //console.log(err);
                  res.status(500).send('Internal Server Error');
              } else {
                  res.render('view', {menus : recipes, menu : recipe[0] });
              }
            });
        } else {
          res.render("view", {menus: recipes, menu : undefined });
        }
    });
});
app.post('/menus', function(req, res){
    var title = req.body.title;
    var description = req.body.description;
    fs.writeFile('data/'+title, description, (err) => {
        if(err) res.status(500).send('Internal Server Error');
        console.log("The file has been saved!");
        res.redirect('/menus/'+title);
    });
});

app.listen(8080, function(){
    console.log("Connected at 8080");
});
