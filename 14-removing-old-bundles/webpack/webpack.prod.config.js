const common = require('./webpack.common.config.js')
const { merge } = require('webpack-merge') 
const MiniCssExtractPlugin = require('mini-css-extract-plugin')

module.exports = merge(common, {
    mode: 'production',
    output: {
        filename: 'js/[name].[contenthash:12].js'
    },
    module: {
        rules: [
            {
                test: /\.css$/,
                use: [ MiniCssExtractPlugin.loader, 'css-loader' ]
            }
        ]
    },
    plugins: [
        new MiniCssExtractPlugin({
            filename: 'css/[name].[contenthash:12].css',
        })
    ]
})
