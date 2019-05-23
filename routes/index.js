const express = require('express');
const router = express.Router();
const checkSession = require('../middleware/auth');
const saveToDb = require('../helper.js')
const { User, Flat, Request } = require('../models/models.js')
const sendEmail = require('../middleware/mailer.js')

/* GET home page. */
router.get('/apartments', checkSession, function (req, res, next) {

  res.render('apartments', { title: [flat, flat2] });
});


router.get('/home', function (req, res) {
  res.render('homepage');
});

router.get('/', function (req, res) {
  res.render('logopage');
});

router.post('/login', async (req, res, next) => {
  console.log(req.body.email)
  console.log(req.body.password)
  try {

    let user = await User.findByCredentials(req.body.email, req.body.password)
    console.log(user)
    req.session._id = user._id
 
    res.send(req.session._id)
  } catch (e) {
    res.send(e)
  }
 })


// router.post('/logIn', async function (req, res) {
//   let user = await User.find({ email: req.body.email })
//   console.log(user);
//   console.log(req.body.email);

//   if (user.length > 0) {
//     req.session.id = user._id;
//     console.log('Success');
//     res.redirect('/apartments');
//   } else {
//     console.log('Try again')
//     res.redirect('/log');
//   };

// });

router.post('/reg', async function (req, res) {
  console.log(req.body.emailName);
  
  const user = new User({
    name: req.body.name,
    surname: req.body.surname,
    email: req.body.email,
    type: req.body.type,
    password: req.body.password
  });

  await user.save();
  res.json(user)
});

router.get('/addflat', function (req, res) {
  res.render('add_apart');
});




router.get('/reg', (req, res, next) => {
  res.render('regpage')
})

router.post('/register', async (req, res, next) => {
  try {
    let user = req.body
    await saveToDb(User, user)
    let textMessage = "Регистрация нового пользователя успешна e-mail:" + req.body.email 
    sendEmail('Регистрация нового пользователя', 'test@mail.ru', textMessage)
    res.sendStatus(201)
  }
  catch (e) {
    next(e)
  }
})

router.post('/login', async (req, res, next) => {
  try {
    let user = await User.findByCredentials(req.body.email, req.body.password)
    console.log(user)
    req.session._id = user._id

    res.send(req.session._id)
  } catch (e) {
    res.send(e)
  }
})

router.post('/addApartment', async (req, res, next) => {
  try {
    let user = req.session._id
    if (user) {
      let newFlat = {
        address: req.body.address,
        floor: req.body.floor,
        owner: user,
        price: req.body.price
      }
      await saveToDb(Flat, newFlat)
      let textMessage = "Зарегистрирована новая квартира по адресу " + newFlat.address 
      
      res.send(newFlat)

    } else {
      res.send({ e: 'Please login' })
    }
  } catch (e) {
    res.send(e)
  }
})

router.post('/prosmotr', async (req, res, next) => {
  let user = req.session._id
  if(user){
    prosmotr
  }
})










module.exports = router;
