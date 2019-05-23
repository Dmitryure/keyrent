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




router.get('/', (req, res, next) => {
  res.send('privet')
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

router.post('/addApartment', async(req, res, next) => {
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










module.exports = router;
