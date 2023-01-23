const User = require('./User');
const Friends = require('./Friends');
const Challenge = require('./Challenge');
const Game = require('./Game');

User.belongsToMany(User,{
  as: 'sender',
  foreignKey: 'sender_id',
  through: Friends
});

User.belongsToMany(User,{
  as: 'receiver',
  foreignKey: 'receiver_id',
  through: Friends
});

User.hasMany(Challenge,{
  foreignKey: 'challenger_id'
});

User.hasMany(Challenge,{
  foreignKey: 'invitee_id'
});

Game.hasOne(Challenge, {
  foreignKey: 'game_id',
  onDelete: 'CASCADE'
});
Challenge.belongsTo(Game);


// game hasOne Creator, Invitee

module.exports = { User, Friends, Challenge, Game };
