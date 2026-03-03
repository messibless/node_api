const Balance = require('../models/balance.model');

/* Get first balance record (standalone) */
const findBalance = async () => {
  return await Balance.findOne();
};

const saveBalance = async (balance, transaction = null) => {
  return await balance.save({ transaction });
};

module.exports = {
  findBalance,  // important: match service
  saveBalance
};