const common = require('./webpack.common.config.js')
const { merge } = require('webpack-merge') 
const path = require('path')
const webpack = require('webpack')

module.exports = merge(common, {
    mode: 'development',
    entry: './src/js/index-dev.js',
    output: {
        filename: 'bundle.js',
        publicPath: '/static/'
    },
    devtool: 'eval-source-map',
    devServer: {
        port: 9000,
        static: {
            directory: path.resolve(__dirname, '../dist'),
        },
        devMiddleware: {
            index: 'index.html',
            writeToDisk: true,
        },
        client: {
            overlay: true
        },
        liveReload: false,
    },
    module: {
        rules: [
            {
                test: /\.css$/,
                exclude: /\.module\.css$/,
                use: [ 'style-loader', 'css-loader' ]
            },
            {
                test: /\.css$/,
                include: /\.module\.css$/,
                use: [
                    'style-loader',
                    {
                        loader: 'css-loader',
                        options: {
                            modules: {
                                localIdentName: '[local]--[md4:hash:7]'
                            }
                        }
                    }
                ],
            },
            {
                test: /\.less$/,
                use: [ 'style-loader', 'css-loader', 'less-loader' ],
            },
            {
                test: /\.scss$/,
                use: [ 'style-loader', 'css-loader', 'sass-loader' ],
            },
            {
                test: /\.(png|jpg|svg)$/,
                type: 'asset',
                parser: {
                    dataUrlCondition: {
                        maxSize: 10 * 1024 // 10 kb
                    }
                },
                generator: {
                    filename: './images/[name][ext]'
                }
            }
        ]
    },
    plugins: [
        new webpack.HotModuleReplacementPlugin()
    ]
})
