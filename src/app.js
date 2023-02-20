const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const cors = require('cors');
const bearerToken = require("express-bearer-token");
const app = express();
const router = express.Router();
const routeV1 = require('./api/v1/index');
app.io = require('socket.io')();



// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');


app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));


app.use(bearerToken());

// enable cors
app.use(cors());
app.options('*', cors());


//check health
router.get('/health', (req, res) => {
  res.status(200).send('Ok');
});
app.use('/innovation', router);
app.use('/innovation/api/v1', routeV1);
// catch 404 and forward to error handler
// app.use(function (req, res, next) {
//   next(createError(404));
// });

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};
  res.json({
    ErrorCode: err.status || 500,
    Message: err.message,
  });
});



module.exports = app;
