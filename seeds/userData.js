//this is the seed of all stored users
const { User } = require('../models/index');

const userData = [
  {
    id: 1,
    username: 'heyDenise',
    password: 'password',
    friends: [2, 3, 4],
    challenge: [3],
    game: [1]
  },
  {
    id: 2,
    username: 'Poolhands',
    password: 'password',
    friends: [1, 3, 4],
    challenge: [1],
    game: [1],
  },
  {
    id: 3,
    username: 'shmuushmuu',
    password: 'password',
    friends: [1, 2, 4],
    challenge: [2, 4],
    game: [2],
  },
  {
    id: 4,
    username: 'ChampionTan',
    password: 'password',
    friends: [1, 2, 3],
    challenge: [],
    game: [2],
  }
]


const seedUsers = () => User.bulkCreate(userData);

module.exports = seedUsers;