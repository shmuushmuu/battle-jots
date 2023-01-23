const { Model, DataTypes } = require('sequelize');
//const bcrypt = require('bcrypt');
const sequelize = require('../config/connection');

class Game extends Model {} 

Game.init(
    {
        id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true,
        },
        score: {
            type: DataTypes.INTEGER,
            allowNull: false, 
        },
        word: {
            type: DataTypes.STRING,
            allowNull: false,       
        } // TODO: GAME DATE WILL GO HERE
    },
    {
        sequelize,
        timestamps: true,
        underscored: true,
        modelName: 'game',
      }
)

module.exports = Game;
