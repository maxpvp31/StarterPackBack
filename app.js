var express = require('express');
var app = express();
var cors = require('cors');

app.use(cors());
app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  req.header("Content-Type", "application/*+json");
  req.header("Accept", "application/json");
  next();
});

app.use(express.json()); 
app.use(express.urlencoded({extended: false}))
app.use(express.static('./StarterPack/'));

app.get('/', function (req, res) {
  res.render('./StarterPack/index.html', {});
});


const slug = '/api';


var userController = require('./user/userController');
app.use(slug + '/user', userController);



module.exports = app;
