const path = require('path')


module.exports = {
	mode: 'production',
	entry: {
		lib: path.join(__dirname, 'index.js')
	},
	output: {
		filename: 'viser-react.js',
		path: path.join(__dirname, '../../chunk/dist/js')
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
		alias: {}
	},
	devtool: 'cheap-module-eval-source-map'
}