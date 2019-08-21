const functions = require('firebase-functions');
const createError = require('http-errors');
const express = require('express');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const logger = require('morgan');

const indexRouter = require('./routes/family');

const app = express();

app.set('view engine', 'json');

const cors = ((req, res, next) => {
  res.set({ 'Access-Control-Allow-Origin': '*' })
  res.set({ 'Access-Control-Allow-Credentials' : 'true' })
  res.set({ 'Access-Control-Allow-Methods': 'GET,HEAD,OPTIONS,POST,PUT' })
  res.set({ 'Access-Control-Allow-Headers': 'Access-Control-Allow-Headers, Origin,Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers' })

  next();
})

app.use(logger('dev'));
app.use(express.json());
app.use(bodyParser.json());
app.use(express.urlencoded({extended: false}));
app.use(cookieParser());
app.use(cors)

app.use('/', indexRouter);

// catch 404 and forward to error handler
app.use((req, res, next) => {
  next(createError(404));
});

// error handler
app.use((err, req, res) => {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500).send();
});

exports.api = functions.https.onRequest(app);
