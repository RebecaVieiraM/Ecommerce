const express = require('express');
const Product = require('../models/Product');
const router = express.Router();

// Rota para listar produtos
router.get('/products', async (req, res) => {
  try {
    const products = await Product.findAll();
    res.json(products);
  } catch (error) {
    res.status(500).json({ message: 'Erro ao buscar produtos', error });
  }
});

// Rota para adicionar produto
router.post('/products', async (req, res) => {
  try {
    const { name, description, price, quantity, category } = req.body;
    const newProduct = await Product.create({ name, description, price, quantity, category });
    res.status(201).json(newProduct);
  } catch (error) {
    res.status(500).json({ message: 'Erro ao adicionar produto', error });
  }
});

// Rota para editar produto
router.put('/products/:id', async (req, res) => {
  const { id } = req.params;
  const { name, description, price, quantity, category } = req.body;

  try {
    await Product.update({ name, description, price, quantity, category }, { where: { id } });
    res.json({ message: 'Produto atualizado com sucesso' });
  } catch (error) {
    res.status(500).json({ message: 'Erro ao atualizar produto', error });
  }
});

// Rota para deletar produto
router.delete('/products/:id', async (req, res) => { 
  const { id } = req.params;

  try {
    await Product.destroy({ where: { id } });
    res.json({ message: 'Produto deletado com sucesso' });
  } catch (error) {
    res.status(500).json({ message: 'Erro ao deletar produto', error });
  }
});

module.exports = router;
