const sequelize = require('../config/connection');
const seedUsers = require('./userData');
const seedGame = require('./gameData');

const seedAll = async () => {
  await sequelize.sync({ force: true });
  
  await seedUsers();

  await seedGame();  
  
  process.exit(0);
};

seedAll();
