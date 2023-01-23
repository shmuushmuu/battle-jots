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
        challenger_id: {
            type: DataTypes.STRING,
            allowNull: false,
            references: {
                model: 'user',
                key: 'username',
            },
        },
        invitee_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: 'user',
                key: 'username',
            },        
        },
        word: {
            type: DataTypes.STRING,
            allowNull: false,     
            references: {
                model: 'challenge',
                key: 'word'
            }       
        } // TODO: GAME DATE WILL GO HERE
    },
    {
        sequelize,
        timestamps: false,
        underscored: true,
        modelName: 'game',
      }
)

module.exports = Game;
