const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const League = sequelize.define('League', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
    allowNull: false
  },
  name: {
    type: DataTypes.STRING(100),
    allowNull: false,
    unique: true
  },
  code: {  // e.g. 'PL', 'UCL', 'SA'
    type: DataTypes.STRING(20),
    allowNull: true
  },
  country: {  // e.g. 'England', 'International', 'Europe'
    type: DataTypes.STRING(50),
    allowNull: true
  },
  flag_emoji: {  // 🇬🇧, 🇪🇺, etc.
    type: DataTypes.STRING(10),
    allowNull: true
  },
  is_popular: {
    type: DataTypes.BOOLEAN,
    defaultValue: false
  },
  match_count: {  // hii ndio ile number unayoonyesha (e.g. 19 for PL, 8 for UCL)
    type: DataTypes.INTEGER,
    allowNull: false,
    defaultValue: 0
  },
  // Optional: logo_url if unataka ku-add images later
  logo_url: {
    type: DataTypes.STRING(255),
    allowNull: true
  }
}, {
  tableName: 'leagues',
  timestamps: true,
  indexes: [
    { fields: ['is_popular', 'match_count'] }, // for sorting popular ones
    { fields: ['country'] }
  ]
});

module.exports = League;