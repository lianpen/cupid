
let app 

if (!app) {
	const express = require('express')
	app = express()

	/**
	 * 解析post参数
	 */
	let bodyParser = require("body-parser")
	app.use(bodyParser.json())
	app.use(bodyParser.urlencoded({ extended: false }))

	/**
	 * 允许cors跨域
	 */
	app.all('*', function(req, res, next) {
	    res.header("Access-Control-Allow-Origin", "*")
	    res.header("Access-Control-Allow-Headers", "X-Requested-With,Content-Type")
	    res.header("Access-Control-Allow-Methods","PUT,POST,GET,DELETE,OPTIONS")
	    res.header("X-Powered-By",' 3.2.1')
	    res.header("Content-Type", "application/json;charset=utf-8")
	    next()
	})
}

module.exports = app