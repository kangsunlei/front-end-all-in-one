# 从零搭建一个前端项目

## 创建目录
```bash
mkdir fe-test
```

## 初始化npm
```
npm init -y
```

## 创建`src`目录，并新建`index.js`
```js
let a = 1;
console.log(a);
```

## 引入`webpack`
```bash
npm i -D webpack webpack-cli
```

## 更改`package.json`，新增：
```json
"dist": "webpack src/index.js"
```
在命令行执行`npm run dist`
可以看到多了个`dist`目录，里面有一个`main.js`

## 新建`webpack.config.js`，填写配置
```js
const path = require('path');

module.exports = {
    mode: 'development',
    entry: path.resolve(__dirname, './src/index.js'),
    output: {
        filename: 'app.js',
        path: path.resolve(__dirname, './dist')
    }
}
```
修改`package.json`：
```json
"dist": "webpack --config webpack.config.js"
```

## 配置html模板
安装插件
```bash
npm i -D html-webpack-plugin
```
新建`public/index.html`文件

修改配置文件：
```js
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
    mode: 'development',
    entry: {
        main: path.resolve(__dirname, './src/index.js')
    },
    output: {
        filename: '[name].[hash:8].js',
        path: path.resolve(__dirname, './dist')
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: path.resolve(__dirname, './pubilc/index.html'),
            filename: 'index.html',
            chunks: ['main']
        })
    ]
}
```

清理之前的构建结果推荐插件：`clean-webpack-plugin`

## 引入`css sass`
```bash
npm i -D style-loader css-loader sass-loader node-sass
```

增加浏览器前缀
```bash
npm i -D postcss-loader autoprefixer
```

新增配置项
```js
module: {
    rules: [{
        test: /\.scss$/,
        use: [
            "style-loader", // 将 JS 字符串生成为 style 节点
            "css-loader", // 将 CSS 转化成 CommonJS 模块
            "postcss-loader"
            "sass-loader" // 将 Sass 编译成 CSS，默认使用 Node Sass
        ]
    }]
}
```

新建`postcss.config.js`
```js
module.exports = {
    plugins: [require('autoprefixer')]  // 引用该插件即可了
}
```

拆分`css`到单独文件
```bash
npm i -D mini-css-extract-plugin
```

```js
module: {
    rules: [{
        test: /\.scss$/,
        use: [
            // "style-loader", // 将 JS 字符串生成为 style 节点
            MiniCssExtractPlugin.loader,
            "css-loader", // 将 CSS 转化成 CommonJS 模块
            "postcss-loader",
            "sass-loader" // 将 Sass 编译成 CSS，默认使用 Node Sass
        ]
    }]
},
plugins: [
    new MiniCssExtractPlugin({
        filename: "[name].[hash:8].css",
        chunkFilename: "[id].css",
    }),
    ...
```

## 打包图片、字体、媒体文件等
`file-loader`就是将文件在进行一些处理后（主要是处理文件名和路径、解析文件url），并将文件移动到输出的目录中
`url-loader` 一般与`file-loader`搭配使用，功能与`file-loader`类似，如果文件小于限制的大小。则会返回`base64`编码，否则使用`file-loader`将文件移动到输出的目录中

## 引入`babel`
```bash
npm i babel-loader @babel/preset-env @babel/core
```

```js
module: {
    rules: [{
        test: /\.js$/,
        use: {
            loader: 'babel-loader'
        },
        exclude: /node_modules/
    },
    ...
```

新建`.babelrc`文件
```json
{
    "presets": ["@babel/preset-env"]
}
```

上面的`babel-loader`只会将 ES6/7/8语法转换为ES5语法，但是对新api并不会转换 例如(promise、Generator、Set、Maps、Proxy等)
此时我们需要借助`babel-polyfill`来帮助我们转换
```bash
npm i @babel/polyfill
```

## 引入React
```bash
npm i -D @babel/preset-react
```

修改`.babelrc`文件
```json
{
    "presets": [
        "@babel/preset-env",
        "@babel/preset-react"
    ]
}
```

安装`React`相关库
```js
npm i react react-dom
```

新建App.js
```js
import React, { Component } from 'react';

class App extends Component {
    render() {
        return (
            <div>
                app
            </div>
        );
    }
}

export default App;
```

修改`index.js`
```js
import React from 'react';
import ReactDOM from 'react-dom';

import App from './App';
import './style/index.scss';

ReactDOM.render(<App/>, document.getElementById('app'));
```

## 配置`webpack-dev-server`进行热更新
```bash
npm i -D webpack-dev-server
```

修改配置
```js
const Webpack = require('webpack')
module.exports = {
  // ...省略其他配置
  devServer:{
    port: 3000,
    hot: true,
    contentBase:'../dist'
  },
  plugins:[
    new Webpack.HotModuleReplacementPlugin()
  ]
}
```

修改`package.json`， 新增：
```json
"dev": "webpack-dev-server --config webpack.config.js --open"
```

## 区分开发环境和生产环境
- `webpack.dev.js`开发环境配置文件
> 开发环境主要实现的是热更新,不要压缩代码，完整的sourceMap
- webpack.prod.js  生产环境配置文件
>生产环境主要实现的是压缩代码、提取css文件、合理的sourceMap、分割代码
需要安装以下模块:
```bash
npm i -D  webpack-merge copy-webpack-plugin optimize-css-assets-webpack-plugin uglifyjs-webpack-plugin
```
- `webpack-merge`合并配置
- `copy-webpack-plugin`拷贝静态资源
- `optimize-css-assets-webpack-plugin`压缩css
- `uglifyjs-webpack-plugin`压缩js

>webpack mode设置production的时候会自动压缩js代码。原则上不需要引入`uglifyjs-webpack-plugin`进行重复工作。但是`optimize-css-assets-webpack-plugin`压缩css的同时会破坏原有的js压缩，所以这里我们引入`uglifyjs`进行压缩

完整配置如下：
webpack.config.js
```js
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

const devMode = process.argv.indexOf('--mode=production') === -1;

module.exports = {
    entry: {
        app: path.resolve(__dirname, './src/index.js')
    },
    output: {
        filename: devMode ? '[name].js' : '[name].[hash:8].js',
        path: path.resolve(__dirname, './dist')
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
            test: /\.scss$/,
            use: [
                // "style-loader", // 将 JS 字符串生成为 style 节点
                devMode ? "style-loader" : MiniCssExtractPlugin.loader,
                "css-loader", // 将 CSS 转化成 CommonJS 模块
                "postcss-loader",
                "sass-loader" // 将 Sass 编译成 CSS，默认使用 Node Sass
            ]
        },
        {
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
        }]
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
```

webpack.dev.js
```js
const Webpack = require('webpack');
const webpackConfig = require('./webpack.config.js');
const WebpackMerge = require('webpack-merge');

module.exports = WebpackMerge(webpackConfig, {
    mode: 'development',
    devtool: 'cheap-module-eval-source-map',
    devServer: {
        port: 3000,
        hot: true,
        contentBase: '../dist'
    },
    plugins: [
        new Webpack.HotModuleReplacementPlugin()
    ]
});
```

webpack.prod.js
```js
const path = require('path');
const webpackConfig = require('./webpack.config.js');
const WebpackMerge = require('webpack-merge');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = WebpackMerge(webpackConfig, {
    mode: 'production',
    optimization: {
        minimizer: [
            new UglifyJsPlugin(),
            new OptimizeCssAssetsPlugin({})
        ],
        splitChunks: {
            chunks: 'all',
            cacheGroups: {
                libs: {
                    name: "vendor",
                    test: /[\\/]node_modules[\\/]/,
                    priority: 10,
                    chunks: "initial" // 只打包初始时依赖的第三方
                }
            }
        }
    },
    plugins: [
        new CleanWebpackPlugin(),
        new HtmlWebpackPlugin({
            template: path.resolve(__dirname, './pubilc/index.html'),
            filename: 'index.html',
            chunks: ['app', 'vendor']
        })
    ]
});
```

package.json
```json
"scripts": {
    "dev": "webpack-dev-server --config webpack.dev.js --open",
    "dist": "webpack --config webpack.prod.js --mode=production"
},
```

## 引入typescript
```bash
npm i @types/react @types/react-dom
npm i -D typescript ts-loader source-map-loader
```

> awesome-typescript-loader可以让Webpack使用TypeScript的标准配置文件`tsconfig.json`编译TypeScript代码。 source-map-loader使用TypeScript输出的sourcemap文件来告诉webpack何时生成自己的sourcemaps。 这就允许你在调试最终生成的文件时就好像在调试TypeScript源码一样。

## 添加TypeScript配置文件
我们需要创建一个`tsconfig.json`文件，它包含了输入文件列表以及编译选项。 在工程根目录下新建文件`tsconfig.json`文件，添加以下内容：
```json
{
    "compilerOptions": {
        "outDir": "./dist/",
        "sourceMap": true,
        "noImplicitAny": true,
        "module": "commonjs",
        "target": "es5",
        "jsx": "react"
    },
    "include": [
        "./src/**/*"
    ]
}

```

参考 https://www.tslang.cn/docs/handbook/react-&-webpack.html

将所有的`.js`结尾的文件，改为`.tsx`结尾

```js
import React from 'react';
import ReactDOM from 'react-dom';
// 上面的写法要改为
import * as React from 'react';
import * as ReactDOM from 'react-dom';
```

修改 webpack.config.js，在`extensions`中增加`ts`相关的后缀
```js
resolve: {
    // Add '.ts' and '.tsx' as resolvable extensions.
    extensions: [".ts", ".tsx", ".js", ".json"]
},
module: {
    rules: [{ 
        test: /\.tsx?$/,
        loader: "ts-loader"
    },
    ...
```

至此，一个基于webpack，React，TypeScript，Sass的前端项目搭建工作已经完成了一大半。

后面还会加入Redux，Redux-saga等。