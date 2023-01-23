const { Challenge } = require('../models/index');

const challengeData = [
  {
    id: 1,
    challenger_id: 'heyDenise',
    invitee_id: 'Poolhands',
    word: 'ouija'
  },
  {
    id: 1,
    challenger_id: 'heyDenise',
    invitee_id: 'Poolhands',
    word: 'ouija'
  }
]

const seedChallenges = () => Challenge.bulkCreate(challengeData);

module.exports = seedChallenges;