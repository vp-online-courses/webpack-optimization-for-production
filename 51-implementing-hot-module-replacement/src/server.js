const express = require('express');
const app = express()
const path = require('path')

if (process.env.NODE_ENV === 'dev') {
    console.log('development mode')
    const webpackDevMiddleware = require('webpack-dev-middleware')
    const configuration = require('../webpack/webpack.dev.config')
    const webpack = require('webpack')
    const webpackCompiler = webpack(configuration)
    app.use(
		webpackDevMiddleware(webpackCompiler, configuration.devServer.devMiddleware)
	)
    const webpackHotMiddleware = require('webpack-hot-middleware')
    app.use(webpackHotMiddleware(webpackCompiler))
}

app.get('/', function (req, res) {
    const absolutePathToHtmlFile = path.resolve(__dirname, '../dist/index.html')
    res.sendFile(absolutePathToHtmlFile)
});

app.use('/static', express.static(path.resolve(__dirname, '../dist')))

app.listen(3000, function () {
    console.log('Application is running on http://localhost:3000/')
})
