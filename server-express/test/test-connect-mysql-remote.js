var mysql      = require('mysql');
var connection = mysql.createConnection({
  host     : '47.103.195.16',
  port	   : '3306',
  user     : 'lianpen',
  password : 'lianpen2007',
  database : 'cupid1'
});
 
connection.connect();

const sql = 'select * from hello'
connection.query(sql, function (error, results, fields) {
  console.log(error)
  console.log(results)
  console.log(fields)
});