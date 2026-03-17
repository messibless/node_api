const sequelize = require('../config/database');

// Import ALL models na uzi-define na sequelize
const User    = require('./user.model');
const Bet     = require('./bet.model');
const Balance = require('./balance.model');
const League  = require('./league.model');  
const initModels = async () => {
  try {
    // Optional: Ongeza associations kama zipo (mfano)
    // if (User.associate) User.associate({ Bet, Balance, League });
    // if (Bet.associate) Bet.associate({ User });
    // if (League.associate) League.associate({ /* future relations */ });

    console.log('Starting model synchronization...');

    // Tumia alter: true kwa development (ina-add columns bila kudelete data)
    // Tumia force: true MARA MOJA TU kama unataka kure-create tables zote fresh
    await sequelize.sync({
      alter: true,   // safe option - inabadilisha schema bila kupoteza data
      // force: true, // COMMENT OUT baada ya mara ya kwanza (au tumia kwa test tu)
    });

    console.log('✅ All tables synchronized successfully (including leagues)');

    // Your balance initialization
    const balanceCount = await Balance.count();
    if (balanceCount === 0) {
      await Balance.create({}); // default balance 0.00 (adjust kulingana na model yako)
      console.log('Initial balance record created with default value');
    }

  } catch (error) {
    console.error('❌ Error synchronizing models:', error.message);
    console.error(error.stack);  // full trace ni muhimu
    throw error;
  }
};

module.exports = {
  sequelize,
  initModels,
  User,
  Bet,
  Balance,
  League   // ← export pia ili iwe accessible kama inahitajika mahali pengine
};