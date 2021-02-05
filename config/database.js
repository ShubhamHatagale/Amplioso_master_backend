const Sequelize = require('sequelize').Sequelize;

require('dotenv').config()


const sequelize = new Sequelize(process.env.DB_DATA, process.env.DB_USER, '', {
  dialect: 'mysql',
  host: process.env.DB_HOST
});

module.exports = sequelize;
