var express = require('express');
var morgan = require('morgan');
var  mongoose = require('mongoose');
var bodyParser = require('body-parser');
var ejs = require('ejs');
var engine = require('ejs-mate');

//requiring files
var secret = require('./config/secret');


var app = express();


//Intiating static folder
app.use(express.static(__dirname + '/public'));

app.use(morgan('dev'));



//ejs initialization
app.engine('ejs', engine);
app.set('view engine', 'ejs');

//requiring  routes

var mainRoutes = require('./routes/main');


//routes middleware
app.use(mainRoutes);


app.listen(secret.port, function(err) {
  if(err) throw err;
  console.log("Server is Running Port "+ secret.port);
})
