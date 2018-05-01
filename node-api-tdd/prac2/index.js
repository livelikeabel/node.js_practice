let express = require('express');
let app = express();
let morgan = require('morgan');
let users = [
    {id: 1, name: 'kim sung jun'},
    {id: 2, name: 'hwang ju chan'},
    {id: 3, name: 'kim jae yun'}
];

app.use(morgan('dev'));

app.get('/', (req, res) => {
    res.send('hello world!');
})

app.get('/users', (req, res) => {
    res.json(users); // .json의 역할은 뭐징? 파싱?(파싱은 뭐지?) .json은 배열로도 보낼 수 있나?
})

app.post('/users', (req,res) => {
    res.send('create complete');
})

app.listen(3000, () => {
    console.log('server running at 3000 port');
})