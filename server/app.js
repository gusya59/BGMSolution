//main route and configuration file
var express = require('express');
var path = require('path');
//var favicon = require('serve-favicon');
var logger = require('morgan');
var bodyParser = require('body-parser');
var cors = require('cors');
var passport = require('passport');
var flash = require('connect-flash');

//routes configuration
var indexRouter = require('./routes/index');
var signupRouter = require('./routes/signup');
var adminRouter = require ('./routes/admin')
var app = express();

app.set('views', __dirname + '/views'); // general configuration
app.set('view engine', 'pug');  //pug engine

//connect to the DB
var mongoose = require('mongoose');
mongoose.Promise = require('bluebird');

mongoose.connect('mongodb+srv://BGM:' + "BgM123456" + '@bgmsoultion-znmku.mongodb.net/test1', { useNewUrlParser: true })
  .then(() => console.log('connection succesful'))
  .catch((err) => console.error(err));

//require('./config/passport')(passport); // pass passport for configuration -->delete passport

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ 'extended': 'true' }));
app.use(express.static(path.join(__dirname, 'public')));

//connection between a backend and a frontend servers - C-O-R-S
app.use(cors({ origin: 'http://localhost:4200' }));
// Adding headers
app.use(function (req, res, next) {
  // Website you wish to allow to connect
  res.setHeader('Access-Control-Allow-Origin', 'http://localhost:4200');
  // Request methods you wish to allow
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
  // Request headers you wish to allow
  res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
  // Set to true if you need the website to include cookies in the requests sent
  // to the API (e.g. in case you use sessions)
  res.setHeader('Access-Control-Allow-Credentials', true);
  // Pass to next layer of middleware
  next();
});


//routing
app.use('/', indexRouter);
app.use('/signup', signupRouter); 
app.use('/admin',adminRouter); 

//app.use('./api', apiRouter);

// required for passport -->probably will be deleted
// //app.use(session({ secret: 'ilovescotchscotchyscotchscotch' })); // session secret
// app.use(passport.initialize());
// app.use(passport.session()); // persistent login sessions
// app.use(flash()); // use connect-flash for flash messages stored in session
//require('./routes/users.js')(passport);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handler.
//input: req
//output: status 
app.use(function (err, req, res, next) {   //next?
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
