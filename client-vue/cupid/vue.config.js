const path = require('path')

module.exports = {
	configureWebpack: config => {
		/**
		 * svg loader
		 */
		let svgRule = {
			test: /\.svg$/,
			use: [{
				loader: 'svg-sprite-loader',
			}, {
				loader: 'svgo-loader'
			}]
		}
		config.module.rules.splice(2, 1, svgRule)
		/**
		 * 去掉eslint
		 */
		config.module.rules[config.module.rules.length - 1].test = /xxxx/
		/**
		 * 添加一些别名
		 */
		config.resolve.alias.model = path.resolve(__dirname, './src/model/index.js')
	}
}

