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

app.set('view engine', 'ejs');

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
  
  app.listen(port, function() {
      console.log(`Server listening on port ${port}`);
  });
};

run();