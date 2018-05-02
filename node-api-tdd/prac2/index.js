let express = require('express');
let app = express();
let morgan = require('morgan');
const syncDb = require('./bin/sync-db');
// let users = [
//     {id: 1, name: 'kim sung jun'},
//     {id: 2, name: 'hwang ju chan'},
//     {id: 3, name: 'kim jae yun'},
//     {id: 4, name: 'abel ko'}
// ];
const models = require('./models');

app.use(morgan('dev'));

app.get('/users', (req, res) => {
    req.query.limit = req.query.limit || 10
    const limit = parseInt(req.query.limit, 10)
    if(Number.isNaN(limit)) {
        res.status(400).end();
    } 

    models.User.findAll({})
        .then(users => {
            res.json(users)
        })
})

app.post('/users', (req,res) => {
    res.send('create complete');
})

syncDb().then(_=> {
    console.log('Sync database!');
    app.listen(3000, () => {
        console.log('server running at 3000 port');
    });
})

