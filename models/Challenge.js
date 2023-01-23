const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

class Challenge extends Model {}

Challenge.init(
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    game_id: {
      type: DataTypes.INTEGER,
      references: {
        model: 'game',
        key: 'id',
      }
    },
    challenger_id: {
      type: DataTypes.INTEGER,
      allowNull: false,  
      references: {
        model: 'user',
        key: 'id',
      }    
    },
    invitee_id: {
      type: DataTypes.INTEGER,
      allowNull: false,  
      references: {
        model: 'user',
        key: 'id',
      } 
    },
    word: {
      type: DataTypes.STRING,
      allowNull: false,      
    }
  },
  {
    sequelize,
    timestamps: false,
    underscored: true,
    modelName: 'challenge',
  }
)

module.exports = Challenge;