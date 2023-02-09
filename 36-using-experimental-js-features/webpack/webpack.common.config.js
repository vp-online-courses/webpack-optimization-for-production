const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')

const config = {
    entry: './src/js/index.js',
    output: {
        path: path.resolve(__dirname, '../dist'),
        clean: true
    },
    module: {
        rules: [
            {
                test: /\.html$/,
                use: [
                    {
                        loader: 'html-loader'
                    }
                ]
            },
            {
                test: /\.js$/,
                exclude: /node_modules/,
                use: {
                    loader: 'babel-loader',
                }
            }
        ]
    },
    plugins: [
        new HtmlWebpackPlugin({
            filename: 'index.html',
            template: 'src/template.html',
        }),
    ]
};

module.exports = config