class Service {

	getConn() {
		let mysql = require('mysql');
		let conn = mysql.createConnection({
		  host     : '127.0.0.1',
		  port	   : '3306',
		  user     : 'root',
		  password : '123',
		  database : 'cupid1'
		})
		return conn
	}

}

module.exports = Service