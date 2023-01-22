const User = require('./User');
const Game = require('./Game');

// ASSOCIATIONS HERE
User.hasMany(Game, {
  foreignKey: 'user_id',
  onDelete: 'CASCADE'
});

Game.belongsTo(User, {
  foreignKey: 'user_id'
});

Game.hasMany(User, {
  foreignKey: 'game_id'
})

module.exports = { User, Game };
