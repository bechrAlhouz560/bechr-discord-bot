const express = require('express');
const PORT = process.env.PORT || 3000
const app = express();



app.get('', function (req, res) {
    res.send('Welcome !')
})
app.listen(PORT, function () {
    console.log('server is listening on ',PORT,'...')
})