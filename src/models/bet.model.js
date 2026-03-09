const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Bet = sequelize.define('Bet', {

  id: {
    type: DataTypes.BIGINT,
    primaryKey: true,
    allowNull:false
  },
  time: {
    type: DataTypes.STRING(100),
    allowNull: true
  },
  date: {
    type: DataTypes.STRING(100),
    allowNull: true
  },
  stake: {
    type: DataTypes.DECIMAL(12,2),
    allowNull: true
  },

  currency: {
    type: DataTypes.STRING(10),
    allowNull: true
  },

  bet_type: {
    type: DataTypes.STRING(50),
    allowNull: true
  },

  total_odds: {
    type: DataTypes.DECIMAL(10,2),
    allowNull: true
  },

  payout: {
    type: DataTypes.DECIMAL(15,2),
    allowNull: true
  },

  result: {
    type: DataTypes.STRING(20),
    defaultValue: 'PENDING'
  },

  status: {
    type: DataTypes.STRING(20),
    defaultValue: 'OPEN'
  },

  homeMatche1: {
    type: DataTypes.STRING(50),
    allowNull: true
  },
  
  awayMatche1: {
    type: DataTypes.STRING(50),
    allowNull: true
  },
  oddsMatche1: {
    type: DataTypes.STRING(50),
    allowNull: true
  },
  scoreMatche1: {
    type: DataTypes.STRING(50),
    allowNull: true
  },
  selectionMatche1: {
    type: DataTypes.STRING(50),
    allowNull: true
  },
  homeMatche2: {
    type: DataTypes.STRING(50),
    allowNull: true
  },
  
  awayMatche2: {
    type: DataTypes.STRING(50),
    allowNull: true
  },
  oddsMatche2: {
    type: DataTypes.STRING(50),
    allowNull: true
  },
  scoreMatche2: {
    type: DataTypes.STRING(50),
    allowNull: true
  },
  selectionMatche2: {
    type: DataTypes.STRING(50),
    allowNull: true
  },

}, {
  tableName: 'bets',
  timestamps: true
});

module.exports = Bet;