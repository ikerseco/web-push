const mysql = require('mysql')
var connection = mysql.createConnection({
    host     : '127.0.0.1',
    user     : 'root',
    password : '',
    database : 'vapikey'
});

connection.connect()


exports.selectuser = (req,res) => {
    connection.query('SELECT * FROM `users`',function (error, results, fields) {
          res.status(200).send(results) 
      });
}