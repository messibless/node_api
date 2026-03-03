const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Balance = sequelize.define('Balance', {
  id: { 
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true,
    allowNull: false
  },

  amount: {
    type: DataTypes.DECIMAL(10,2),   // better kuliko 5,2
    allowNull: false,
    defaultValue: 0.00
  }

}, {
  tableName: 'balance',
  timestamps: true
});

module.exports = Balance;