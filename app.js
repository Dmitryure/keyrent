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