const User = require('./User');
const Friends = require('./Friends');
const Challenge = require('./Challenge');
const Game = require('./Game');

// ASSOCIATIONS HERE
User.hasMany(Friends, {
  foreignKey: 'user_id',
});

Friends.belongsTo(User, {
  foreignKey: 'user_id',
});

Friends.hasMany(User, {
  foreignKey: 'friend_id',
});

User.hasMany(Challenge, {
  foreignKey: 'challenge_id',
  onDelete: 'CASCADE',
});

User.hasMany(Game, {
  foreignKey: 'game_id',
  onDelete: 'CASCADE'
});

Game.belongsToMany(User, {
  through: Challenge,
  foreignKey: 'user_id'
});

Game.hasMany(User, {
  foreignKey: 'user_id'
})

// game hasOne Creator, Invitee

module.exports = { User, Friends, Challenge, Game };
