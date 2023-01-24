const router = require('express').Router();
const Op = require('Sequelize').Op;
const { Challenge, User, Friends } = require('../../models');

router.post('/', async (req, res) => {
  try {
    const newChallenge = await Challenge.create({
      challenger_id: req.session.userId,
      invitee_id: parseInt(req.body.invitee_id),
      word: req.body.word,
      status: 0
    });


    res.json(newChallenge);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.put('/', async (req,res)=>{
  try {
    const updatedChallenge = await Challenge.update(
      {
        status: 1
      },
      {
        where: {
          id: req.body.id
        }
      }
    );

    res.json({updatedChallenge, message: "Challenge accepted!"})
  } catch(err){
    res.status(500).json(err)
  }
})

router.delete('/', async (req,res)=>{
  try {
    const updatedChallenge = await Challenge.destroy(
      {
        where: {
          id: req.body.id
        }
      }
    );

    res.json({updatedChallenge, message: "Challenge destroyed!"})
  } catch(err){
    res.status(500).json(err)
  }
})

router.get('/sentChallenges', async (req,res) => {
  try {
    let challenges = await Challenge.findAll({
      where: {
        challenger_id: req.session.userId,
        status: 0
      }
    });

    challenges = challenges.map(c=>c.get({plain: true}));

    let sentChallenges = [];
    for(const c of challenges){
      let user = await User.findByPk(c.invitee_id);
      user = user.get({plain: true});
      sentChallenges.push({
        ...c,
        username: user.username
      })
    }
    console.log(sentChallenges);

    res.json(sentChallenges)
  } catch (err){
    res.status(500).json(err)
  }
});

router.get('/receivedChallenges', async (req,res) => {
  try {
    let challenges = await Challenge.findAll({
      where: {
        invitee_id: req.session.userId,
        status: 0
      },
    });

    challenges = challenges.map(c=>c.get({plain: true}));

    let receivedChallenges = [];
    for(const c of challenges){
      let user = await User.findByPk(c.challenger_id);
      //user = user.get({plain: true});
      receivedChallenges.push({
        ...c,
        username: user.username
      })
    }
    console.log(receivedChallenges);

    res.json(receivedChallenges)
  } catch (err){
    res.status(500).json(err)
  }
});

router.get('/acceptedChallenges', async (req,res) => {
  try {
    let challenges = await Challenge.findAll({
      where: {
        invitee_id: req.session.userId,
        status: 1
      }
    });
    challenges = challenges.map(c=>c.get({plain: true}));
    
    let acceptedChallenges = [];
    console.log('we getting here/')
    for(const c of challenges){
      let user = await User.findByPk(c.challenger_id);
      user = user.get({plain: true});
      acceptedChallenges.push({
        ...c,
        username: user.username
      })
    }
    console.log(acceptedChallenges);

    res.json(acceptedChallenges)
  } catch (err){
    res.status(500).json(err)
  }
});

module.exports = router;