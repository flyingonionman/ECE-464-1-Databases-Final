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

  con.query(
    "SELECT c.FacilityName, c.Latitude, c.Longitude, z.Neighborhood, z.Zipcode FROM condom as c ,ZipstoNeigh as z WHERE z.Zipcode = c.Zipcode AND z.Neighborhood = ?",
    [req.params.id],
    function(error, results, fields) {
      if (error) throw error;
      res.json(results);
    }
  );

});  

app.route('/diagnoses/year/:year')

.get(function(req, res, next) {
  con.query(
    "SELECT z.Neighborhood, (sum(h.NumberHIVdiagnoses) +  sum(h.NumAIDSdiagnoses)) as HIVAIDS_Diagnoses FROM ZipstoNeigh as z, HIVAIDS as h WHERE z.Neighborhood = h.Neighborhood and h.Yr = ? and z.Neighborhood <> 'All' GROUP BY z.Neighborhood ORDER BY HIVAIDS_Diagnoses desc;",
    [req.params.year],
    function(error, results, fields) {
      if (error) throw error;
      res.json(results);
    }
  );

});  

app.route('/diagnoses/count')

.get(function(req, res, next) {
  con.query(
    "SELECT z.Neighborhood, count(*) as ranker FROM ZipstoNeigh as z, condom as c WHERE z.Zipcode = c.Zipcode AND z.Neighborhood <> 'All' GROUP BY z.Neighborhood ORDER BY  count(*) desc;",    function(error, results, fields) {
      if (error) throw error;
      res.json(results);
    }
  );

});  

app.route('/diagnoses/ratio/:year')

.get(function(req, res, next) {
  con.query(
    "SELECT h.Neighborhood, centers.count as numCenters, ((sum(h.NumberHIVdiagnoses) +   sum(h.NumAIDSdiagnoses))/centers.count) as ratiodiagnosestocenters FROM (SELECT z.Neighborhood, count(*) as count FROM ZipstoNeigh as z, condom as c WHERE z.Zipcode = c.Zipcode AND z.Neighborhood <> 'All' GROUP BY z.Neighborhood) as centers, HIVAIDS as h WHERE centers.Neighborhood = h.Neighborhood AND Yr = ? GROUP BY h.Neighborhood ORDER BY ratiodiagnosestocenters  ASC;",
    [req.params.year],
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