// configurando o Sequelize
const { Sequelize } = require('sequelize');

const sequelize = new Sequelize({
  dialect: 'sqlite',
  storage: './config/dbase.sqlite'
});

module.exports = sequelize;