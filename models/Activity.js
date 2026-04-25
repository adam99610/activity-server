const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');

const Activity = sequelize.define('Activity', {
  name: {
    type: DataTypes.STRING,
    allowNull: false
  },
  date: {
    type: DataTypes.DATE,
    allowNull: false
  },
  city: {
    type: DataTypes.STRING
  },
  weather: {
    type: DataTypes.STRING
  },
  temperature: {
    type: DataTypes.FLOAT
  }
});

module.exports = Activity;
