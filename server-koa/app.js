
let app 

if (!app) {
	/**
	 * new koa
	 */
	const Koa = require('koa')
	app = new Koa()
	/**
	 * cors
	 */
	const cors = require('@koa/cors')
	app.use(cors({
		origin: '*'
	}))
	/**
	 * body-parser
	 */
	const koaBody = require('koa-body')
	app.use(koaBody())
}

module.exports = app