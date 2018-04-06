var express = require('express');
var morgan = require('morgan');
var  mongoose = require('mongoose');
var bodyParser = require('body-parser');
var ejs = require('ejs');
var engine = require('ejs-mate');
var session = require('express-session');
var cookieParser = require('cookie-parser');
var flash = require('express-flash');
var MongoStore = require('connect-mongo')(session);
//requiring files
var secret = require('./config/secret');


var app = express();

mongoose.connect(secret.database, function(err) {
  if (err) {
    console.log(err);
  } else {
    console.log("Connected to the database");
  }
});


//Intiating static folder
app.use(express.static(__dirname + '/public'));
app.use(express.static(__dirname + '/uploaded_images'));
app.use(morgan('dev'));



app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use(cookieParser());
app.use(session({
  resave: true,
  saveUninitialized: true,
  secret: secret.secretKey,
  store: new MongoStore({ url: secret.database, autoReconnect: true})
}));


//cart
// app.use(function(req,res,next){
//    req.locals.cart = [];
//    res.locals.cart = [];
//    console.log(res.locals.cart);
//    next();
// });

app.use(flash());



//ejs initialization
app.engine('ejs', engine);
app.set('view engine', 'ejs');

//requiring  routes

var mainRoutes = require('./routes/main');
var adminRoutes = require('./routes/admin');


//routes middleware
app.use(mainRoutes);
app.use(adminRoutes);




app.listen(secret.port, function(err) {
  if(err) throw err;
  console.log("Server is Running Port "+ secret.port);
})
