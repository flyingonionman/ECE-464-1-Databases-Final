const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const con = require('./database');

app.route('/condom')
  .get(function(req, res, next) {
    con.query(
      "SELECT * FROM condom",
      function(error, results, fields) {
        if (error) throw error;
        res.json(results);
      }
    );
  });

app.get('/status', (req, res) => res.send('Working!'));

// Port 8080 for Google App Engine
app.set('port', process.env.PORT || 5000);
app.listen(5000);