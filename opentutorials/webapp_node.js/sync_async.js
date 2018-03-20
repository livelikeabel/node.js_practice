var fs = require('fs');

// Sync
console.log(1);
var text_data = fs.readFileSync('test_data.txt', {encoding: 'utf8'});
console.log(text_data);

// Async
console.log(2);
fs.readFile('test_data.txt', {encoding: 'utf8'}, function(err, data) {
    console.log(data);
})
console.log("program is done.");
