const express = require('express');
const router = express.Router();
const checkSession = require('../middleware/auth');
const { User, Flat } = require('../models/models');
const saveToDb = require('../helper.js')

/* GET home page. */
router.get('/apartments', checkSession, function (req, res, next) {

  let flat = {
    address: 'profsoyuznaya 135',
    floor: '5',
    owner: {
      name: 'Vitya',
      surname: 'Petruhin',
      email: 'petuhvitya@mail.ru',
      type: 'owner'
    },
    price: 5000,
    request: {
      type: 'cleaning',
      body: 'помойте мне жопу'
    },
    rentor: {
      name: 'Vasya',
      surname: 'Muhin',
      email: 'mutya@mail.ru',
      type: 'rentor'
    }
  };

  let flat2 = {
    address: 'profsoyuznaya 135',
    floor: '5',
    owner: {
      name: 'Vitya',
      surname: 'Petruhin',
      email: 'petuhvitya@mail.ru',
      type: 'owner'
    },
    price: 5000,
    request: {
      type: 'cleaning',
      body: 'помойте мне жопу'
    },
    rentor: {
      name: 'Vasya',
      surname: 'Muhin',
      email: 'mutya@mail.ru',
      type: 'rentor'
    }
  };


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
    saveToDb(User, user)
    res.sendStatus(201)
  }
  catch (e) {
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
      res.send(newFlat)

    } else {
      res.send({ e: 'Please login' })
    }
  } catch (e) {
    console.log(e)
  }
})










module.exports = router;
