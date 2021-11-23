const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const mongoose = require('mongoose');
const cors = require("cors");
const dotenv = require('dotenv');

var arrivalsRouter = require('./routes/arrivals');
var stationsRouter = require('./routes/stations');

dotenv.config({path: __dirname + '/../.env.local'});
var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));

app.use(cors({
  origin: '*',
  credentials: true,
}));

app.use(express.json());

const uri = process.env.ATLAS_URI;
mongoose.connect(uri, { useNewUrlParser: true, useCreateIndex: true, useUnifiedTopology: true });

const connection = mongoose.connection;
connection.once('open', () => {
  console.log('MondoDB database connection established successfully');
});

app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', stationsRouter);
app.use('/arrivals', arrivalsRouter);
app.use('/Stations', stationsRouter);

// catch 404 and forward to error handler
app.use((req, res, next) => {
  res.status(404).send('Unable to find request');
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};
  
  // Website you wish to allow to connect
  //res.setHeader('Access-Control-Allow-Origin', ['*']);

  // Request methods you wish to allow
  //res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');

  // Request headers you wish to allow
  //res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
  //res.setHeader('Access-Control-Allow-Credentials', true);

  // Pass to next layer of middleware
  next();

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
