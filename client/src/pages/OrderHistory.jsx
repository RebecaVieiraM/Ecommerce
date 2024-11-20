import React, { useState, useEffect } from 'react';
import api from '../service';
import { Link } from 'react-router-dom';

const OrderHistory = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadOrders();
  }, []);

  const loadOrders = async () => {
    try {
      const response = await api.get('/orders');
      setOrders(response.data);
    } catch (error) {
      console.error('Erro ao carregar pedidos!', error);
    } finally {
      setLoading(false);
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'Aguardando Pagamento':
        return 'orange';
      case 'Em Preparação':
        return 'blue';
      case 'Enviado':
        return 'green';
      case 'Entregue':
        return 'gray';
      default:
        return 'black';
    }
  };

  return (
    <div style={{ padding: '20px', textAlign: 'center' }}>
      <h1 style={{ color: 'white', marginBottom: '20px' }}>Histórico de Pedidos</h1>

      {loading ? (
        <p style={{ color: 'white' }}>Carregando pedidos...</p>
      ) : (
        <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center' }}>
          {orders.length ? (
            orders.map(order => (
              <div key={order.id} style={{ backgroundColor: '#fff', margin: '20px', width: '300px', padding: '15px', border: '1px solid #ddd', borderRadius: '12px', color: 'black' }}>
                <h3>Pedido #{order.id}</h3>
                <p style={{ color: '#FF6347' }}>Total: R${order.total}</p>
                <h4 style={{ color: getStatusColor(order.status) }}>Status: {order.status}</h4>
              </div>
            ))
          ) : (
            <p style={{ color: 'white' }}>Nenhum pedido encontrado.</p>
          )}
        </div>
      )}
      <Link to="/profile">Voltar para Produtos</Link>
    </div>
  );
};

export default OrderHistory;