const router = require('express').Router();
const Op = require('Sequelize').Op;
const { Challenge, User, Friends } = require('../../models');

router.post('/', async (req, res) => {
  console.log({
    challenger_id: req.session.userId,
    invitee_id: req.body.id,
    word: req.body.wordField,
    status: 0
  })
  try {
    const newChallenge = await Challenge.create({
      challenger_id: req.session.userId,
      invitee_id: req.body.id,
      word: req.body.wordField,
      status: 0
    });


    res.json(newChallenge);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;