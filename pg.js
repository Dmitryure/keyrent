router.post('/login', async function (req, res, next) {
    let getUser = await User.find({ password: req.body.password });
   
    if (getUser.length > 0 && getUser[0].name === req.body.name) {
      req.session.name = req.body.name;
      console.log('Success');
      res.redirect('/home');
    } else {
      console.log('Try again')
      res.redirect('/');
    };
   });