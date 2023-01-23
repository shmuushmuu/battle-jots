const router = require('express').Router();
const Op = require('Sequelize').Op;
const { User, Friends } = require('../../models');

router.get('/findUser', async (req, res) => {
  try {
    const users = await User.findAll({
      where: {
        username: {
          [Op.like]: '%' + req.body.name + '%'
        }
      }
    });
    res.json({users});
  } catch(err){
    res.status(500).json(err);
  }
});

router.post('/', async (req, res) => {
  try {
    const newUser = await User.create({
      username: req.body.username,
      password: req.body.password,
    });

    req.session.save(() => {
      req.session.userId = newUser.id;
      req.session.username = newUser.username;
      req.session.loggedIn = true;

      res.json(newUser);
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

router.post('/login', async (req, res) => {
  try {
    const user = await User.findOne({
      where: {
        username: req.body.username,
      },
    });

    if (!user) {
      res.status(400).json({ message: 'No user account found!' });
      return;
    }

    const validPassword = user.checkPassword(req.body.password);

    if (!validPassword) {
      res.status(400).json({ message: 'No user account found!' });
      return;
    }

    req.session.save(() => {
      req.session.userId = user.id;
      req.session.username = user.username;
      req.session.loggedIn = true;

      res.json({ user, message: 'You are now logged in!' });
    });
  } catch (err) {
    res.status(400).json({ message: 'No user account found!' });
  }
});

router.post('/logout', (req, res) => {
  if (req.session.loggedIn) {
    req.session.destroy(() => {
      res.status(204).end();
    });
  } else {
    res.status(404).end();
  }
});

router.post('/addUser', async (req, res) => {
  try {

    const newFriend = await Friends.create({
      sender_id: req.body.sender_id,
      receiver_id: req.body.receiver_id,
      status: 0
    });

    res.json({ newFriend, message: 'Friend request sent!' });
  } catch (err) {
    res.status(500).json(err);
  }
});

router.put('/addUser', async (req,res) => {
  try {
    const updatedFriend = await Friends.update(
      {
        status: 1
      },
      {
        where: {
          id: req.body.id
        }
      }
    );
    res.json({updatedFriend, message: 'Friend request accepted!'});
  } catch (err) {
    res.status(500).json(err);
  }
});

router.delete("/addFriend", async (req,res) => {
  try{
    const deletedRequest = await Friends.destroy({
      where: {
        id: req.body.id
      }
    });
    res.json({deletedRequest, message: 'Friend request deleted!'});
  } catch(err){
    req.status(500).json(err);
  }
});

router.get('/sentRequests',async(req,res)=> {
  const sentRequests = await Friends.findAll({
    where:{
      sender_id: req.session.userId,
      status: 0
    }
  });
  res.json({ sentRequests});
});

router.get('/receivedRequests',async(req,res)=> {
  const receivedRequests = await Friends.findAll({
    where:{
      receiver_id: req.session.userId,
      status: 0
    }
  });
  res.json({ receivedRequests});
});

router.get('/friends',async(req,res)=> {
  console.log('sup')
  const friends = await Friends.findAll({
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
  res.json({ friends });
});

router.delete("/friends", async (req,res) => {
  try{
    const deletedfriend = await Friends.destroy({
      where: {
        id: req.body.id
      }
    });
    res.json({deletedfriend, message: 'Friend deleted!'});
  } catch(err){
    req.status(500).json(err);
  }
});

module.exports = router;
