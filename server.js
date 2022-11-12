require('dotenv').config();

const express = require('express');
const {initBot} = require('./bot');
const { initDb } = require('./db/initDb');
const PORT = process.env.PORT || 3000
const app = express();


app.get('/salim', function (req, res) {
    res.send('this is salim')
})
app.get('', function (req, res) {
    res.send('Welcome !')
})



initDb().then(function (seq) {
    app.listen(PORT, async function () {
        console.log('server is listening on localhost:',PORT);
        initBot();
    })
})
