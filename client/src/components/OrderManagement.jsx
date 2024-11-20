// OrderManagement.jsx
import React, { useEffect, useState } from 'react';
import api from '../service';

const OrderManagement = () => {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    loadOrders();
  }, []);

  const loadOrders = async () => {
    try {
      const response = await api.get('/orders');
      setOrders(response.data);
    } catch (error) {
      console.error('Erro ao carregar pedidos:', error);
    }
  };

  const updateStatus = async (id, newStatus) => {
    try {
      await api.put(`/orders/${id}`, { status: newStatus });
      loadOrders(); // Reload orders after status update
    } catch (error) {
      console.error('Erro ao atualizar status:', error);
    }
  };

  return (
    <div>
      <h2>Gerenciar Pedidos</h2>
      {orders.length === 0 ? (
        <p>Nenhum pedido encontrado.</p>
      ) : (
        <ul>
          {orders.map(order => (
            <li key={order.id}>
              <h4>Status: {order.status}</h4>
              <p>Total: R$ {order.total}</p>
              <h5>Produtos:</h5>
              <ul>
                {order.products.map((product, index) => (
                  <li key={index}>{product.name} - R$ {product.price}</li>
                ))}
              </ul>
              <select 
                value={order.status} 
                onChange={(e) => updateStatus(order.id, e.target.value)}
              >
                <option value="pendente">Aguardando Pagamento</option>
                <option value="concluido">Concluido</option>
                <option value="cancelado">Cancelado</option>
              </select>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default OrderManagement;
