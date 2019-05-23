<<<<<<< HEAD
const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const { User, Flat, Request } = require('./models/models.js')
const saveToDb = require('./helper.js')

const app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.get('/', (req, res, next) => {
  res.send('privet')
})

app.post('/register', async (req, res, next) => {
  try {
    let user = req.body
    saveToDb(User, user)
    res.sendStatus(201)
  }
  catch (e) {
    res.send(e)
  }
})

app.post('/addApartment', async(req, res, next) => {
  try{
    let user = req.session._id
    if(user){
      let newFlat = {
        address:req.body.address,
        floor:req.body.floor,
        owner:user,
        price:req.body.price
      }
    res.send(newFlat)
    
    }else{
      res.send({e: 'Please login'})
    }
  }catch(e){

  }
})

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

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
=======
// Фреймворк веб-приложений.
const express = require("express");
const app = express();
// HTTP request logger middleware for node.js.
// Логгирование деталей запросов.
const morgan = require("morgan");
app.use(morgan("dev"));

const path = require('path');

// Обработка POST запросов.
// urlencoded.
app.use(express.urlencoded({extended: true}));
// json.
app.use(express.json());

// Импорт маршрутов.
const indexRouter = require("./routes/index");
const usersRouter = require("./routes/users");


//session
const session = require('express-session');

let FileStore = require('session-file-store')(session)

let sessionConfig = {
  secret: 'keyboard cat',
  cookie: {
    expires: 30000
  },
  resave: false,
  saveUninitialized: true,
  store: new FileStore({}),
}

app.use(session(sessionConfig));




// Подключаем статику
app.use(express.static(path.join(__dirname, 'public')));

// Подключаем views(hbs)
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');


// Подключаем импортированные маршруты с определенным url префиксом.
app.use('/', indexRouter);
app.use('/users', usersRouter);

// Обработка ошибок.
app.use((req, res, next) => {
  const error = new Error("Not found");
  error.status = 404;
  next(error);
});

app.use((error, req, res, next) => {
  res.status(error.status || 500);
  res.json({
    error: {
      message: error.message
    }
  });
});

module.exports = app;
>>>>>>> ecbb139c7fb38fcbfbc6c36e4845dc5f143fafe7
