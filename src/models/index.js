const sequelize = require('../config/database');
const User = require('./user.model');
const Bet = require('./bet.model');
const Balance = require('./balance.model');

const initModels = async () => {
  try {
    await sequelize.sync({
      force: false // usitumie true kila wakati
    });
    const balanceCount = await Balance.count();

if (balanceCount === 0) {
  await Balance.create({});
  console.log('Initial balance created with 0.00');
}

    console.log('Database models synchronized successfully');
  } catch (error) {
    console.error('Error synchronizing models:', error.message);
    throw error;
  }
};

module.exports = {
  sequelize,
  initModels,
  User,
  Bet
};