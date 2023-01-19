//this is the seed of all stored users
const { User } = require('../models/index');

const userData = [
  {
    id: 1,
    username: 'heyDenise',
    password: 'password',
    friends: [2, 3, 4],
    challenge: [],
    activeGame: [1]
  },
  {
    id: 2,
    username: 'Poolhands',
    password: 'password',
    friends: [1, 3, 4],
    challenge: [],
    activeGame: [1],
  },
  {
    id: 3,
    username: 'shmuushmuu',
    password: 'password',
    friends: [1, 2, 4],
    challenge: [4],
    activeGame: [],
  },
  {
    id: 4,
    username: 'ChampionTan',
    password: 'password',
    friends: [1, 2, 3],
    challenge: [],
    activeGame: [],
  }
]


const seedUsers = () => User.bulkCreate(userData);

module.exports = seedUsers;