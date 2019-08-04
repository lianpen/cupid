const path = require('path')

console.log('编译大约1分钟 请稍后...');

const ExtractTextPlugin = require("extract-text-webpack-plugin")

const postcssConfig = {}

module.exports = {
	mode: 'production',
	entry: {
		lib: path.join(__dirname, 'index.js')
	},
	output: {
		filename: 'antd-mobile.js',
		path: path.join(__dirname, '../../chunk/dist/js')
	},
	module: {
		rules: [{
			test: /\.jsx?$/,
			exclude: /node_modules/,
			loader: 'babel-loader',
			options: {
				presets: ['react', 'env']
			}
		}, {
			test: /\.tsx?$/,
			use: [{
				loader: 'babel-loader',
				options: {
					presets: ['react', 'env']
				}
			}, {
				loader: 'ts-loader',
				options: {
					transpileOnly: true
				}
			}]
		}, {
			test: /\.css$/,
			use: ExtractTextPlugin.extract({
				use: [{
					loader: 'css-loader',
					options: {
						sourceMap: true,
					}
				}]
			})
		}, {
			test: /\.less$/,
			use: ExtractTextPlugin.extract({
				use: [{
					loader: 'css-loader',
					options: {
						sourceMap: true,
					}
				}, {
					loader: 'less-loader',
					options: {
						sourceMap: true,
						javascriptEnabled: true
					}
				}]
			})
		}]
	},
	externals: {
		'react': 'React',
		'react-dom': 'ReactDOM'
	},
	resolve: {
		extensions: [
			'.web.tsx',
			'.web.ts',
			'.web.jsx',
			'.web.js',
			'.ts',
			'.tsx',
			'.js',
			'.jsx',
			'.json',
		],
		alias: {
			"rc-align": path.resolve(__dirname, './lib/rc-align'),
			"rc-animate": path.resolve(__dirname, './lib/rc-animate'),
			"rc-checkbox": path.resolve(__dirname, './lib/rc-checkbox'),
			"rc-collapse": path.resolve(__dirname, './lib/rc-collapse'),
			"rc-gesture": path.resolve(__dirname, './lib/rc-gesture'),
			"rc-slider": path.resolve(__dirname, './lib/rc-slider'),
			"rc-swipeout": path.resolve(__dirname, './lib/rc-swipeout'),
			"rc-tooltip": path.resolve(__dirname, './lib/rc-tooltip'),
			"rc-trigger": path.resolve(__dirname, './lib/rc-trigger'),
			"rc-util": path.resolve(__dirname, './lib/rc-util'),
			"rmc-calendar": path.resolve(__dirname, './lib/rmc-calendar'),
			"rmc-cascader": path.resolve(__dirname, './lib/rmc-cascader'),
			"rmc-date-picker": path.resolve(__dirname, './lib/rmc-date-picker'),
			"rmc-dialog": path.resolve(__dirname, './lib/rmc-dialog'),
			"rmc-drawer": path.resolve(__dirname, './lib/rmc-drawer'),
			"rmc-feedback": path.resolve(__dirname, './lib/rmc-feedback'),
			"rmc-input-number": path.resolve(__dirname, './lib/rmc-input-number'),
			"rmc-list-view": path.resolve(__dirname, './lib/rmc-list-view'),
			"rmc-notification": path.resolve(__dirname, './lib/rmc-notification'),
			"rmc-nuka-carousel": path.resolve(__dirname, './lib/rmc-nuka-carousel'),
			"rmc-picker": path.resolve(__dirname, './lib/rmc-picker'),
			"rmc-pull-to-refresh": path.resolve(__dirname, './lib/rmc-pull-to-refresh'),
			"rmc-steps": path.resolve(__dirname, './lib/rmc-steps'),
			"rmc-tabs": path.resolve(__dirname, './lib/rmc-tabs'),
			"rmc-tooltip": path.resolve(__dirname, './lib/rmc-tooltip')
			/**
			 *  "rc-checkbox": "~2.0.0",
		        "rc-collapse": "~1.9.1",
		        "rc-slider": "~8.2.0",
		        "rc-swipeout": "~2.0.0",
		        "rmc-calendar": "^1.0.0",
		        "rmc-cascader": "~5.0.0",
		        "rmc-date-picker": "^6.0.8",
		        "rmc-dialog": "^1.0.1",
		        "rmc-drawer": "^0.4.11",
		        "rmc-feedback": "^2.0.0",
		        "rmc-input-number": "^1.0.0",
		        "rmc-list-view": "^0.11.0",
		        "rmc-notification": "~1.0.0",
		        "rmc-nuka-carousel": "~3.0.0",
		        "rmc-picker": "~5.0.0",
		        "rmc-pull-to-refresh": "~1.0.1",
		        "rmc-steps": "~1.0.0",
		        "rmc-tabs": "~1.2.0",
		        "rmc-tooltip": "~1.0.0"
			 */
		}
	},
	devtool: 'cheap-module-eval-source-map',
	plugins: [
		new ExtractTextPlugin({
			filename: 'antd-mobile.css',
			disable: false,
			allChunks: true,
		})
	]
}