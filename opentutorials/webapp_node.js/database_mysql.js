var mysql = require('mysql');
var conn = mysql.createConnection({
    host     : 'localhost',
    user     : 'root',
    password : 'dmltjd11',
    database : 'o2'
});

conn.connect();
// sql : SELECT
// var sql = 'SELECT * FROM topic';
// conn.query(sql, function(err, rows, fields){//row는 '행'이라는 뜻이다.
//   if(err){
//       console.log(err);
//   } else {
//       for(var i = 0; i < rows.length; i++){
//         console.log(rows[i].title + " : " + rows[i].description);
//       }
//   }
// });

// sql : INSERT
// var sql = 'INSERT INTO topic (title, description, author) VALUES(?, ?, ?)';
// var params = ['Supervisor', 'Watcher', 'graphittie'];
// conn.query(sql, params, function(err, rows, fields){
//     if(err) console.log(err);
//     console.log(rows.insertId);
// });

// sql : UPDATE
// var sql = 'UPDATE topic SET title="?", author="?" WHERE id=?';
// var params = ["npm", "ggu", 2];
// conn.query(sql, params, function(err, rows, fields){
//     if(err) console.log(err);
//     console.log(rows);
// });

// sql : DELETE
// var sql = 'DELETE FROM topic WHERE id="?"';
// var params = [6];
// conn.query(sql, params, function(err, rows, fields){
//     if(err) console.log(err);
//     console.log(rows);
// });

conn.end();
