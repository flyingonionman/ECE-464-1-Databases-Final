var mysql = require('mysql');

var con = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "Miny0ung!",
  port:3306,
  database: "sailor"
});

con.connect(function(err) {
  if (err) throw err;
  console.log("Connected!");
  con.query("SELECT * FROM boats", function (err, result,fields) {
    if (err) throw err;
    console.log(result);
  });
});