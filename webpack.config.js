const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

const devMode = process.env.NODE_ENV !== 'production';

module.exports = {
    entry: {
        app: path.resolve(__dirname, './src/index.tsx')
    },
    output: {
        filename: devMode ? '[name].js' : '[name].[hash:8].js',
        path: path.resolve(__dirname, './dist')
    },
    resolve: {
        // Add '.ts' and '.tsx' as resolvable extensions.
        extensions: [".ts", ".tsx", ".js", ".json"]
    },
    module: {
        rules: [{
            test: /\.js$/,
            use: {
                loader: 'babel-loader'
            },
            exclude: /node_modules/
        },
        { 
            test: /\.tsx?$/,
            loader: "ts-loader"
        },
        {
            test: /\.scss$/,
            use: [
                // "style-loader", // 将 JS 字符串生成为 style 节点
                devMode ? "style-loader" : MiniCssExtractPlugin.loader,
                "css-loader", // 将 CSS 转化成 CommonJS 模块
                "postcss-loader",
                "sass-loader" // 将 Sass 编译成 CSS，默认使用 Node Sass
            ]
        },
        /*{
            test: /\.(jpe?g|png|gif)$/i, //图片文件
            use: [
                {
                    loader: 'url-loader',
                    options: {
                        limit: 10240,
                        fallback: {
                            loader: 'file-loader',
                            options: {
                                name: 'img/[name].[hash:8].[ext]'
                            }
                        }
                    }
                }
            ]
        },
        {
            test: /\.(mp4|webm|ogg|mp3|wav|flac|aac)(\?.*)?$/, //媒体文件
            use: [
                {
                    loader: 'url-loader',
                    options: {
                        limit: 10240,
                        fallback: {
                            loader: 'file-loader',
                            options: {
                                name: 'media/[name].[hash:8].[ext]'
                            }
                        }
                    }
                }
            ]
        },
        {
            test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/i, // 字体
            use: [
                {
                    loader: 'url-loader',
                    options: {
                        limit: 10240,
                        fallback: {
                            loader: 'file-loader',
                            options: {
                                name: 'fonts/[name].[hash:8].[ext]'
                            }
                        }
                    }
                }
            ]
        }*/]
    },
    plugins: [
        new MiniCssExtractPlugin({
            filename: devMode ? '[name].css' : "[name].[hash:8].css",
            chunkFilename: devMode ? '[id].css' : '[id].[hash].css',
        }),
        new HtmlWebpackPlugin({
            template: path.resolve(__dirname, './pubilc/index.html'),
            filename: 'index.html',
            chunks: ['app']
        })
    ]
}