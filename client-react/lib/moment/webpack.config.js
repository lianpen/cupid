const path = require('path')


module.exports = {
	mode: 'production',
	entry: {
		lib: path.join(__dirname, './src/moment.js')
	},
	output: {
		filename: 'moment.js',
		path: path.join(__dirname, '../../chunk/dist/js')
	}
}