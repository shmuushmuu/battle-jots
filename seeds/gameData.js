//this is the seed of all stored games
const { Game } = require('../models/index');

const gameData = [
  {
    id: 1,
    PlayerAWord: 'penis',
    PlayerBWord: 'boobs',
    playerAGuess1: [ 'pizza', 2 ],
		playerBGuess1: [ 'stick', 1 ],
    playerAGuess2: [ 'tummy', 0 ],
		playerBGuess2: [ 'honey', 1 ],
    playerAGuess3: [ 'poopy', 1 ],
		playerBGuess3: [ 'alien', 0 ],
    playerAGuess4: [ 'snipe', 5 ],
		playerBGuess4: [ 'water', 0 ],
    playerAGuess5: [ 'pines', 5],
		playerBGuess5: [ 'boobs', 6],
    playerAGuess6: [ ],
		playerBGuess6: [ ],
    playerAGuess7: [ ],
		playerBGuess7: [ ],
    playerAGuess8: [ ],
		playerBGuess8: [ ],
  }
]



const seedGame = () => Game.bulkCreate(gameData);

module.exports = seedGame;