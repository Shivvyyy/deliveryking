var express = require('express');
var app = express();
var morgan = require('morgan');
var  mongoose = require('mongoose');
var passport = require('passport');
var bodyParser = require('body-parser');
var ejs = require('ejs');
var engine = require('ejs-mate');
var session = require('express-session');
var cookieParser = require('cookie-parser');
var flash = require('express-flash');
var MongoStore = require('connect-mongo')(session);

var http = require('http'),
    fs = require('fs'),
    ccav = require('./ccavutil.js'),
    qs = require('querystring'),
    ccavReqHandler = require('./ccavRequestHandler.js'),
    ccavResHandler = require('./ccavResponseHandler.js');
//requiring files
var secret = require('./config/secret');


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

app.post('/ccavRequestHandler', function (request, response){
	ccavReqHandler.postReq(request, response);
});


app.post('/ccavResponseHandler', function (request, response){
        ccavResHandler.postRes(request, response);
});


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept, Authorization"
  );
  if (req.method === "OPTIONS") {
    res.header("Access-Control-Allow-Methods", "PUT, POST, PATCH, DELETE, GET");
    return res.status(200).json({});
  }
  next();
});


app.use(cookieParser());
app.use(session({
  resave: true,
  saveUninitialized: true,
  secret: secret.secretKey
  // store: new MongoStore({ url: secret.database, autoReconnect: true})
}));


//cart
// app.use(function(req,res,next){
//    req.locals.cart = [];
//    res.locals.cart = [];
//    console.log(res.locals.cart);
//    next();
// });
app.use(passport.initialize());
app.use(passport.session()); // persistent login sessions
app.use(flash());



//ejs initialization
app.engine('ejs', engine);
app.set('view engine', 'ejs');


require('./config/passport.js')(passport); // pass passport for configuration
require('./routes/auth.js')(app, passport); // load our routes and pass in our app and fully configured passport

//requiring  routes

var mainRoutes = require('./routes/main');
var adminRoutes = require('./routes/admin');



//routes middleware
app.use(adminRoutes);
app.use(mainRoutes);

app.get('*', function(req, res){
  res.redirect('/', 302);
});


app.listen(secret.port, function(err) {
  if(err) throw err;
  console.log("Server is Running Port "+ secret.port);
});
