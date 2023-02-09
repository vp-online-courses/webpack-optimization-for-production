const express = require('express');
const app = express()
const path = require('path')

app.get('/', function (req, res) {
    const absolutePathToHtmlFile = path.resolve(__dirname, '../dist/index.html')
    res.sendFile(absolutePathToHtmlFile)
});

app.use('/static', express.static(path.resolve(__dirname, '../dist')))

app.listen(3000, function () {
    console.log('Application is running on http://localhost:3000/')
})
