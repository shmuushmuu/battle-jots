const sequelize = require('../config/connection');
const seedUsers = require('./userData');
const seedGame = require('./gameData');

const seedAll = async () => {
  await sequelize.sync({ force: true });
  console.log('\n----- DATABASE SYNCED -----\n');  

  await seedUsers();
  console.log('\n----- USERS SEEDED -----\n');

  await seedGame();  
  console.log('\n----- GAMES SEEDED -----\n');

  process.exit(0);
};

seedAll();
