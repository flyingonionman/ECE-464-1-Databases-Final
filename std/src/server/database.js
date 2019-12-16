var mysql = require('mysql');
const express = require('express');
const app = express();

var con = mysql.createConnection({
  socketPath: 'vertical-web-261900:us-central1:database-469-final-project',
  user: "root",
  password: "dL31998Ei6udEbNE",
  database: "diagnosis"
});

con.connect(function(err) {
  if (err) throw err;
  console.log('Connected as thread id: ' + con.threadId);
});

module.exports = con;

