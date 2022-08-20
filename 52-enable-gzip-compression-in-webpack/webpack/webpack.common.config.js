const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')

const config = {
    output: {
        path: path.resolve(__dirname, '../dist'),
        clean: true
    },
    resolve: {
        extensions: [ '.ts', '.js' ]
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
                test: /\.(js|ts)$/,
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