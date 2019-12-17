var mysql = require('mysql');
const express = require('express');
const app = express();

var con = mysql.createConnection({
  host: "35.222.36.73",
  user: "root",
  password: "dL31998Ei6udEbNE",
  port:3306,
  database: "diagnosis"
});

con.connect(function(err) {
  if (err) throw err;
  console.log('Connected as thread id: ' + con.threadId);
});

module.exports = con;

