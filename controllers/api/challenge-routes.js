const router = require('express').Router();
const Op = require('Sequelize').Op;
const { Challenge, User, Friends } = require('../../models');

router.post('/', async (req, res) => {
  try {
    const newChallenge = await Challenge.create({
      challenger_id: req.session.userID,
      invitee_id: req.body.id,
      word: req.body.wordField
    });

    req.session.save(() => {
      req.session.userId = newUser.id;
      req.session.username = newUser.username;
      req.session.loggedIn = true;

      res.json(newChallenge);
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;