const { Sequelize } = require('sequelize');

const sequelize = new Sequelize('postgres', 'postgres', 'fx5600msi', {
  host: 'localhost',
  dialect: 'postgres'
});

module.exports = sequelize;
