//this is the seed of all stored users
const { User } = require('../models/index');

const userData = [
  {
    id: 1,
    username: 'heyDenise',
    password: 'password',
  },
  {
    id: 2,
    username: 'Poolhands',
    password: 'password',
  },
  {
    id: 3,
    username: 'shmuushmuu',
    password: 'password',
  },
  {
    id: 4,
    username: 'ChampionTan',
    password: 'password',
  }
]


const seedUsers = () => User.bulkCreate(userData);

module.exports = seedUsers;