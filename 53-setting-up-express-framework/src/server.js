const express = require('express');
const app = express()

app.get('/', function (req, res) {
    res.send('Basic web server is running')
})

app.listen(3000, function () {
    console.log('Application is running on http://localhost:3000/')
})
