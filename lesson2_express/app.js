const express = require('express');
const users = require('./dataBase/users');

const app = express();

const port = 5000;

app.get('/', (req, res) => {
    // console.log(req);
    // res.send('Hello World!')
    res.json('Hello World!')
    // res.write('Hello World!')
    // res.end('Hello') // просто закінчення
    // res.status(404).json("not found") // висвітлити помилку
})

app.get('/users', (req, res) => {
    res.json(users) //прийдуть всі юзери ззовні
});

app.get('/users/:userId', (req, res) => {
    res.json(users['userId'])
})

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
});
