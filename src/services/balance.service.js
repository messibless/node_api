const { findBalance, saveBalance } = require('../repositories/balance.repository');
const sequelize = require('../config/database');

/* GET balance */
const getBalance = async () => {
  const balance = await findBalance();
  if (!balance) throw new Error('Balance not found');
  return balance;
};

/* UPDATE balance amount */
const updateBalanceAmount = async (amount) => {
  if (amount === undefined) throw new Error('Amount is required');

  return await sequelize.transaction(async (t) => {
    const balance = await findBalance();
    if (!balance) throw new Error('Balance not found');

    balance.amount = amount;
    await saveBalance(balance, t);

    return balance;
  });
};

module.exports = {
  getBalance,
  updateBalanceAmount
};