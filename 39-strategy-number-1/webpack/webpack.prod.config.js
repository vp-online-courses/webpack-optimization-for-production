const common = require('./webpack.common.config.js')
const { merge } = require('webpack-merge') 
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin')
const path = require('path')
const glob = require('glob')
const { PurgeCSSPlugin } = require('purgecss-webpack-plugin')

module.exports = merge(common, {
    mode: 'production',
    output: {
        filename: 'js/[name].[contenthash:12].js'
    },
    devtool: 'source-map',
    optimization: {
        minimize: true,
        minimizer: [
            `...`,
            new CssMinimizerPlugin({
                minimizerOptions: {
                    preset: [
                        'default',
                        {
                            discardComments: { removeAll: true },
                        },
                    ],
                },
            }),
        ],
        splitChunks: {
            cacheGroups: {
                jquery: {
                    test: /[\\/]node_modules[\\/]jquery[\\/]/,
                    chunks: 'initial',
                    name: 'jquery',
                },
                bootstrap: {
                    test: /[\\/]node_modules[\\/]bootstrap[\\/]/,
                    chunks: 'initial',
                    name: 'bootstrap',
                },
            },
        }
    },
    module: {
        rules: [
            {
                test: /\.css$/,
                exclude: /\.module\.css$/,
                use: [ MiniCssExtractPlugin.loader, 'css-loader' ]
            },
            {
                test: /\.css$/,
                include: /\.module\.css$/,
                use: [
                    MiniCssExtractPlugin.loader,
                    {
                        loader: 'css-loader',
                        options: {
                            modules: {
                                localIdentName: '[hash:base64]'
                            }
                        }
                    }
                ],
            },
            {
                test: /\.less$/,
                use: [ MiniCssExtractPlugin.loader, 'css-loader', 'less-loader' ],
            },
            {
                test: /\.scss$/,
                use: [ MiniCssExtractPlugin.loader, 'css-loader', 'postcss-loader', 'sass-loader' ],
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
                    filename: './images/[name].[contenthash:12][ext]'
                },
                use: [
                    {
                        loader: 'image-webpack-loader',
                        options: {
                            mozjpeg: {
                                quality: 40,
                            },
                            pngquant: {
                                quality: [0.65, 0.90],
                                speed: 4
                            }
                        }
                    }
                ]
            }
        ]
    },
    plugins: [
        new MiniCssExtractPlugin({
            filename: 'css/[name].[contenthash:12].css',
        }),
        new PurgeCSSPlugin({
            paths: glob.sync(`${path.join(__dirname, '../src')}/**/*`,  { nodir: true }),
        })
    ]
})
