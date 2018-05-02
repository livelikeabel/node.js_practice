let express = require('express');
let app = express();
let morgan = require('morgan');
let users = [
    {id: 1, name: 'kim sung jun'},
    {id: 2, name: 'hwang ju chan'},
    {id: 3, name: 'kim jae yun'},
    {id: 4, name: 'abel ko'}
];

app.use(morgan('dev'));

app.get('/users', (req, res) => {
    req.query.limit = req.query.limit || users.length
    const limit = parseInt(req.query.limit, 10)
    if(Number.isNaN(limit)) {
        res.status(400).end();
    } 
    
    const newUsers = [ ...users.slice(0, limit) ];

    //users 보다 limit이 클 때는...?, -1 도 안됨!
    res.json(newUsers); // .json의 역할은 뭐징? 파싱?(파싱은 뭐지?) .json은 배열로도 보낼 수 있나?
})

app.post('/users', (req,res) => {
    res.send('create complete');
})

app.listen(3000, () => {
    console.log('server running at 3000 port');
})