var express = require('express');
var app = express.Router();

// ASK - WHAT ROLE DOES ROUTER PLAY HERE? IN THE ORIGINAL DOCUMENTATION THIS WORK WAS APP. IF I REPLACE ALL ROUTER WITH APP IT STILL WORKS.

/* GET users listing. */
app.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

module.exports = app;
