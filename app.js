const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const { User, Flat } = require('./models/models.js');
const saveToDb = require('./helper.js');


const app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// Импорт маршрутов.
const indexRouter = require("./routes/index");


//session
const session = require('express-session');

let FileStore = require('session-file-store')(session)

let sessionConfig = {
  secret: 'keyboard cat',
  cookie: {
    expires: 300000
  },
  resave: false,
  saveUninitialized: true,
  store: new FileStore({}),
}

app.use(session(sessionConfig));

// Подключаем импортированные маршруты с определенным url префиксом.
app.use('/', indexRouter);




// catch 404 and forward to error handler
// app.use(function (req, res, next) {
//   next(createError(404));
// });

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});



module.exports = app;

