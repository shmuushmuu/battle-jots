const router = require('express').Router();
const {} = require('../models/');

// get all posts for homepage
router.get('/', async (req, res) => {
  try {
    res.render('homepage', {
      //games, 
      logged_in: req.session.loggedIn
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get('/login', (req, res) => {
  if (req.session.loggedIn) {
    res.redirect('/');
    return;
  }

  res.render('login');
});

router.get('/signup', (req, res) => {
  if (req.session.loggedIn) {
    res.redirect('/');
    return;
  }

  res.render('signup');
});

router.get('/profile', (req, res) => {
    res.render('profile', {
      logged_in: req.session.loggedIn,
      username: req.session.username
    });
  

  
});

module.exports = router;
