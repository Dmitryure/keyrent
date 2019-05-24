const express = require('express');
const router = express.Router();
const checkSession = require('../middleware/auth');
const saveToDb = require('../helper.js')
const { User, Flat } = require('../models/models.js')
const sendEmail = require('../middleware/mailer.js')
const multer = require('multer')
const upload = multer({dest: 'uploads/'})
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
    req.session.type = user.type

    res.send(req.session._id)
  } catch (e) {
    res.send(e)
  }
})

router.post('/addrequest', async (req, res, next) => {
  let requestType = req.body.type
  let request = req.body.request
  let appartmentId = req.body.appartmentId
  let textMessage = 'Новая просьба об оказании услуги добавлена'
  if (req.session._id && req.session.type) {
    try {
      let body = {
        type: requestType,
        body: request,
        completed: false
      }
      let appartment = await Flat.findOneAndUpdate({_id:appartmentId}, {$push:{request:body}})
      sendEmail(requestType, "test@mail.ru", textMessage)
      res.send(appartment)
    } catch (e) {
      res.send(e)
    }
  } 
})

router.post('/addApartment', upload.single('foto'), async (req, res, next) => {
  try {
    let user = req.session._id
    if (user) {
      let newFlat = {
        address: req.body.address,
        floor: req.body.floor,
        image: file.paths,
        owner: user,
        price: req.body.price
      }
      await saveToDb(Flat, newFlat)
      let textMessage = "Зарегистрирована новая квартира по адресу " + newFlat.address
      sendEmail("Новая квартира", "test@mail.ru", textMessage)
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

})










module.exports = router;
