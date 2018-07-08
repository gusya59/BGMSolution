
var express = require('express');
var path = require('path');
//var cookieParser = require('cookie-parser');
var logger = require('morgan');
var favicon = require('serve-favicon');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');


var app = express();


//routes
var indexRouter = require('./routes/index');
//var usersRouter = require('./routes/users');
//var apiRouter = require ('./routes/api')


//DB configuration and connection
// mongoose.connect(process.env.DB_URL,function(err){
//   if(err) throw err;
//   console.log("connected to data base");
// }); 
mongoose.Promise = require('bluebird');
mongoose.connect('mongodb://localhost/mean-angular6', {promiseLibrary: require('bluebird') })
  .then(() =>  console.log('connection succesful'))
  .catch((err) => console.error(err));


app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));
app.use('/', express.static(path.join(__dirname, 'dist')));

app.use('/', indexRouter);
//app.use('/users', usersRouter);
//app.use('./api', apiRouter);


// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
