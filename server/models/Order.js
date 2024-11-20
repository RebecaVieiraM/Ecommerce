// models/Order.js
const { DataTypes } = require('sequelize');
const sequelize = require('../config/config');

const Order = sequelize.define('Order', {
  status: {
    type: DataTypes.ENUM('Pendente', 'Concluído', 'Cancelado'),
    allowNull: false,
    defaultValue: 'Pendente',
  },
  products: {
    type: DataTypes.JSON,
    allowNull: false,
  },
  total: {
    type: DataTypes.DECIMAL(10, 2),
    allowNull: false,
  },
}, {
  timestamps: true,
});

module.exports = Order;
