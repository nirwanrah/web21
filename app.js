var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

//connecting database into pgAdmin
const { Pool} = require('pg')
const pool = new Pool({
  user: 'postgres',
  host: 'localhost',
  database: 'datadb',
  password: '12345',
  port: 5432,
})

// var indexRouter = require('./routes/index')(pool);
var tipedataRouter = require('./routes/tipedata')(pool);

var app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// app.use('/', indexRouter);
app.use('/tipedata', tipedataRouter); //API di /tipedata //

module.exports = app;
 