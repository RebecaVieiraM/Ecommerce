// index.js

const express = require('express');
const cors = require('cors');
const authRoutes = require('./routes/auth');
const productsRoutes = require('./routes/products');
const ordersRoutes = require('./routes/orders');

const app = express();
app.use(cors());
app.use(express.json());

app.use('/api/', authRoutes);
app.use('/api/', productsRoutes); 
app.use('/api/', ordersRoutes); 

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Servidor rodando na porta ${PORT}`));
