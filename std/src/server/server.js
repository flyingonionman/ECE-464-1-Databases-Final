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
      "SELECT * FROM condom as c",
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

app.route('/neigh/:id')

.get(function(req, res, next) {
  console.log(req.params.id);

  con.query(
    "SELECT c.FacilityName, c.Latitude, c.Longitude, z.Neighborhood, z.Zipcode FROM condom as c ,ZipstoNeigh as z WHERE z.Zipcode = c.Zipcode AND z.Neighborhood = ?",
    [req.params.id],
    function(error, results, fields) {
      if (error) throw error;
      res.json(results);
    }
  );
  console.log(req.params.id);

});  


app.get('/status', (req, res) => res.send('Working!'));

// Port 8080 for Google App Engine
app.set('port', process.env.PORT || 5000);
app.listen(5000);