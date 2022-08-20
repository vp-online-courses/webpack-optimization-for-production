const production = require('./webpack.prod.config.js')
const { merge } = require('webpack-merge')
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin

module.exports = merge(production, {
    plugins: [
        new BundleAnalyzerPlugin({
            analyzerMode: 'server',
			openAnalyzer: true,
        }),
    ]
})