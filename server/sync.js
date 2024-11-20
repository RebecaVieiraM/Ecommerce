// sync.js
const sequelize = require('./config/config');
const User = require('./models/User');
const Product = require('./models/Product');
const Order = require('./models/Order');

sequelize.sync({ force: true }).then(() => {
  console.log('Banco de dados sincronizado.');
}).catch((error) => {
  console.error('Erro ao sincronizar banco de dados:', error);
});
