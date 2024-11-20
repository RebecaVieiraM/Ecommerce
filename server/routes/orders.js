const express = require('express');
const router = express.Router();
const Order = require('../models/Order');

// Criar um novo pedido
router.post('/orders', async (req, res) => {
  const { products, total } = req.body;
  try {
    const newOrder = await Order.create({ products, total });
    res.status(201).json(newOrder);
  } catch (error) {
    console.error(error);
    res.status(400).json({ error: 'Erro ao criar pedido' });
  }
});

// Obter todos os pedidos
router.get('/orders', async (req, res) => {
  try {
    const orders = await Order.findAll();
    res.status(200).json(orders);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Erro ao carregar pedidos' });
  }
});

// Obter um pedido específico
router.get('/orders/:id', async (req, res) => {
  try {
    const order = await Order.findByPk(req.params.id);
    if (!order) {
      return res.status(404).json({ error: 'Pedido não encontrado' });
    }
    res.status(200).json(order);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Erro ao carregar o pedido' });
  }
});

// Atualizar um pedido (incluindo status)
router.put('/orders/:id', async (req, res) => {
  const { products, total, status } = req.body;

  // Verifica se o status enviado é válido
  const validStatuses = ['pendente', 'concluido', 'cancelado'];
  if (status && !validStatuses.includes(status)) {
    return res.status(400).json({ error: 'Status inválido' });
  }

  try {
    const order = await Order.findByPk(req.params.id);
    if (!order) {
      return res.status(404).json({ error: 'Pedido não encontrado' });
    }

    // Atualiza o pedido com os campos fornecidos
    await order.update({ products, total, status });

    res.status(200).json(order);
  } catch (error) {
    console.error(error);
    res.status(400).json({ error: 'Erro ao atualizar pedido' });
  }
});


// Excluir um pedido
router.delete('/orders/:id', async (req, res) => {
  try {
    const order = await Order.findByPk(req.params.id);
    if (!order) {
      return res.status(404).json({ error: 'Pedido não encontrado' });
    }
    await order.destroy();
    res.status(204).send();
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Erro ao excluir pedido' });
  }
});

module.exports = router;