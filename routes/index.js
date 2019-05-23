const express = require('express');
const router = express.Router();
const checkSession = require('../middleware/auth');

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


router.get('/log', function (req, res) {
  res.render('logopage');
});

router.get('/reg', function (req, res) {
  res.render('regpage');
});

router.get('/addflat', function (req, res) {
  res.render('add_apart');
});










module.exports = router;
