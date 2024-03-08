const express = require('express');
const mod = require('./class.js');
const cors = require('cors');
const path = require('path');
const bodyParser = require('body-parser');
const app = express();
const port = 3000;

const {Pool} = require('pg');

const pool = new Pool({
    user: 'postgres',
    host: 'localhost',
    database: 'healthcare',
    password: 'postgres',
    port: 5432,
    max: 50,
});

_dirname = path.resolve();

// app.set('view engine', 'ejs');

app.use(cors());
app.use(express.json());
app.use(express.static('public'));
app.use(bodyParser.urlencoded({
  extended: true,
}));

async function run() {
  app.use(function(req, res, next){
    res.setTimeout(2000, function(){
      console.log('Request has timed out.');
      res.send('Something went wrong. Please try again. ');
      });
    next();
  });

  app.get('/', async function(req, res) {
    res.sendFile(path.join(_dirname, '/frontpage2.html'));
  });

  app.get('/patientdata', async function (req, res) {
    res.send(await mod.allpatients());
  });

  app.get('/createpatient', async function (req, res) {
    res.sendFile(path.join(_dirname, '/createpatient.html'));
  });

  app.post('/register', async function (req, res) {
    console.log(req.body);
    let create = await mod.createPatient(req.body.name, req.body.dob, req.body.address, req.body.ethnicity, req.body.bloodtype, req.body.conditions, req.body.medications);
    // if (create == true) {
    //   res.sendFile(path.join(_dirname, '/successcreatepatient.html'));
    // } else {
    //   res.sendFile(path.join(_dirname, '/failcreatepatient.html'));
    // };
  });

  app.get('/createpatientsuccess', async function (req, res) {
    res.sendFile(path.join(_dirname, '/successcreatepatient.html'));
  });

  app.get('/createpatientfail', async function (req, res) {
    res.sendFile(path.join(_dirname, '/failcreatepatient.html'));
  });
  
  app.listen(port, function() {
      console.log(`Server listening on port ${port}`);
  });
};

run();