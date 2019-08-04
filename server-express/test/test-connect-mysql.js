var mysql      = require('mysql');
var connection = mysql.createConnection({
  host     : '127.0.0.1',
  port	   : '3306',
  user     : 'root',
  password : '123',
  database : 'test-db'
});
 
connection.connect();

const sql = 'select * from first_table'
connection.query(sql, function (error, results, fields) {
  console.log(error)
  console.log(results)
  console.log(fields)
});