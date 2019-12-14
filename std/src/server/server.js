const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const con = require('./database');
var cors = require('cors');

var corsOptions = {
  origin: 'http://localhost:3000',
  optionsSuccessStatus: 200 // some legacy browsers (IE11, various SmartTVs) choke on 204
}

// Then pass them to cors:
app.use(cors(corsOptions))

app.route('/condom')
  .get(function(req, res, next) {
    con.query(
      "SELECT * FROM condom c WHERE c.FacilityPK = \"52681898\"",
      function(error, results, fields) {
        if (error) throw error;
        res.json(results);
      }
    );
  });

app.route('/HIV')
.get(function(req, res, next) {
  con.query(
    "SELECT * FROM HIVAIDS",
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