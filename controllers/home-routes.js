const router = require('express').Router();
const { Friends, User } = require('../models/');
const Op = require('Sequelize').Op;
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

router.get('/profile', async (req, res) => {
    if(!req.session.loggedIn){
      return res.redirect('login')
    };

    const friendsData = await Friends.findAll({
    where:{
        [Op.or]: [
          {
            receiver_id: req.session.userId,
          },
          {
            sender_id: req.session.userId,
          }
        ],
        status: 1
      }
    });

    const receivedRequestsData = await Friends.findAll({
      where:{
        receiver_id: req.session.userId,
        status: 0
      }
    });

    const sentRequestsData = await Friends.findAll({
      where:{
        sender_id: req.session.userId,
        status: 0
      }
    });

    const friends = friendsData.map(friend=>friend.get({plain: true}));
    const receivedRequests = receivedRequestsData.map(receivedRequest=>receivedRequest.get({plain: true}));
    const sentRequests = sentRequestsData.map(sentRequest=>sentRequest.get({plain: true}));

    res.render('profile', {
      logged_in: req.session.loggedIn,
      username: req.session.username,
      friends,
      sentRequests,
      receivedRequests
    });
  

  
});

module.exports = router;
