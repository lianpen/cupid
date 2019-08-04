const path = require('path')
const fs = require('fs')
const host = require('./host')

module.exports = {
    mode: 'development',
    entry: {
        app: path.join(__dirname, 'src', 'index.js')
    },
    output: {
        filename: 'app.js',
        chunkFilename: '[name].js',
        path: path.join(__dirname, 'dist')
    },
    module: {
        rules: [{
            test: /\.js$/,
            exclude: /node_modules/,
            use: {
                loader: 'babel-loader',
                options: {
                    presets: ['react', 'env', 'stage-0'],
                    plugins: ['transform-decorators-legacy', 'transform-decorators']
                }
            }
        }, {
            test: /\.bundle\.js$/,
            include: /src/,
            exclude: /node_modules/,
            use: [{
                loader: 'bundle-loader',
                options: {
                    name: 'module-[name]',
                    lazy: true
                }
            }, {
                loader: 'babel-loader',
                options: {
                    presets: ['react', 'env', 'stage-0'],
                    plugins: ['transform-decorators-legacy', 'transform-decorators']
                }
            }]
        }, {
            test: /\.less$/,
            use: ['style-loader', 'css-loader', 'less-loader']
        }, {
            test: /\.(png|jpg)$/,
            use: 'url-loader?limit=102400'
        }, {
            test: /\.svg$/,
            use: [{
                loader: "babel-loader",
                options: {
                    presets: ['react']
                }
            }, {
                loader: "react-svg-loader",
                options: {
                    jsx: true
                }
            }]
        }]
    },
    resolve: {
        alias: {
            config: path.resolve(__dirname, './src/config'),
            model: path.resolve(__dirname, './src/model'),
            ui: path.resolve(__dirname, './src/ui'),
            util: path.resolve(__dirname, './src/util'),
            global: path.resolve(__dirname, './src/global'),
            BaseRc: path.resolve(__dirname, './src/ui/BaseRc'),
            assets: path.resolve(__dirname, './src/assets'),
            env: path.resolve(__dirname, './env'),
            store: path.resolve(__dirname, './src/store')
        }
    },
    devServer: {
        contentBase: path.join(__dirname, 'dist'),
        port: '8101',
        inline: false,
        hot: false,
        host: host.host
    },
    devtool: 'cheap-module-eval-source-map',
    externals: {
        'react': 'React',
        'react-dom': 'ReactDOM',
        'antd-mobile': 'AntdMobile',
        'viser-react': 'ViserReact',
        'moment': 'moment'
    },
    stats: "verbose"
}