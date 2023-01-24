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

    const f = [];
    for(const friend of friends){
      let id = friend.receiver_id === req.session.userId? friend.sender_id: friend.receiver_id;
      let user = await User.findByPk(id);
      user = user.get({plain: true});
      f.push({
        ...friend,
        user_id: id,
        username: user.username
      });
    }

    const s = [];
    for(const sent of sentRequests){
      let user = await User.findByPk(sent.receiver_id);
      user = user.get({plain: true});
      s.push({
        ...sent,
        username: user.username
      });
    }

    const r = [];
    for(const received of receivedRequests){
      let user = await User.findByPk(received.sender_id);
      user = user.get({plain: true});
      r.push({
        ...received,
        username: user.username
      });
    }
    console.log(r)


    res.render('profile', {
      logged_in: req.session.loggedIn,
      username: req.session.username,
      friends: f,
      sentRequests: s,
      receivedRequests: r
    });
  

  
});




module.exports = router;
