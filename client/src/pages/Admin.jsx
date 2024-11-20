import React, { useState, useEffect } from 'react';
import api from '../service';

const Admin = () => {
  const [products, setProducts] = useState([]);
  const [orders, setOrders] = useState([]);
  const [addProduct, setAddProduct] = useState({ name: '', description: '', price: '', category: '' });
  const [editProduct, setEditProduct] = useState(null);
  const [showAddForm, setShowAddForm] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    setLoading(true);
    try {
      const [productsResponse, ordersResponse] = await Promise.all([api.get('/products'), api.get('/orders')]);
      setProducts(productsResponse.data);
      setOrders(ordersResponse.data);
    } catch (error) {
      console.error('Erro ao carregar dados!', error);
    } finally {
      setLoading(false);
    }
  };

  const handleAdd = async (e) => {
    e.preventDefault();
    try {
      const response = await api.post('/products', addProduct);
      setProducts([...products, response.data]);
      setShowAddForm(false);
      setAddProduct({ name: '', description: '', price: '', category: '' });
    } catch (error) {
      console.error('Erro ao adicionar produto!', error);
    }
  };

  const handleSave = async (e) => {
    e.preventDefault();
    try {
      await api.put(`/products/${editProduct.id}`, editProduct);
      loadData();
      setEditProduct(null);
    } catch (error) {
      console.error('Erro ao atualizar produto!', error);
    }
  };

  const handleDelete = async (id) => {
    try {
      await api.delete(`/products/${id}`);
      setProducts(products.filter(product => product.id !== id));
    } catch (error) {
      console.error('Erro ao deletar produto!', error);
    }
  };

  const handleUpdateStatus = async (orderId, newStatus) => {
    const statusMap = {
      'Pendente': 'pendente',            
      'Concluído': 'concluido',            
      'Cancelado': 'cancelado',           
    };
  
    const mappedStatus = statusMap[newStatus];  
  
    if (!mappedStatus) {
      console.error('Status inválido');
      return; // Não envia a requisição se o status não for válido
    }
  
    try {
      const response = await api.put(`/orders/${orderId}`, { status: mappedStatus });
      console.log('Resposta da API:', response);
      setOrders(prevOrders =>
        prevOrders.map(order =>
          order.id === orderId ? { ...order, status: newStatus } : order
        )
      );
    } catch (error) {
      console.error('Erro ao atualizar status do pedido!', error);
    }    
  };
  
  

  const statusOptions = ['Pendente', 'Concluído', 'Cancelado'];

  const getStatusColor = (status) => {
    switch (status) {
      case 'Pendente':
        return 'orange';
      case 'Concluído':
        return 'green';
      case 'Cancelado':
        return 'red';
    }
  };

  return (
    <div style={{ padding: '20px', textAlign: 'center', justifyContent: 'center', color: 'black' }}>
      <h1 style={{ marginBottom: '20px', color: 'white' }}>Painel de Administração</h1>

      {/* Gerenciar Produtos */}
      <button onClick={() => setShowAddForm(true)} style={{ backgroundColor: 'mediumaquamarine', color: 'black' }}>
        Adicionar Produto
      </button>

      {products.length ? (
        <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center' }}>
          {products.map(product => (
            <div key={product.id} style={{ backgroundColor: '#fff', margin: '20px', width: '300px', padding: '15px', border: '1px solid #ddd', borderRadius: '12px' }}>
              <h3>{product.name}</h3>
              <p>{product.description}</p>
              <p style={{ color: '#FF6347' }}>Preço: R${product.price}</p>
              <button onClick={() => handleDelete(product.id)} style={{ backgroundColor: 'red', color: 'white' }}>Deletar</button>
              <button onClick={() => setEditProduct(product)} style={{ backgroundColor: 'yellowgreen', color: 'white' }}>Editar</button>
            </div>
          ))}
        </div>
      ) : (
        <p style={{ color: 'white' }}>Nenhum produto disponível.</p>
      )}

      {showAddForm && (
        <div className="modal" style={{ alignItems: 'center', backgroundColor: 'rgba(0,0,0,0.7)', margin: '20px', width: '300px', padding: '15px', border: '1px solid #ddd', borderRadius: '12px' }}>
          <h2 style={{ color: 'white' }}>Adicionar Produto</h2>
          <form onSubmit={handleAdd}>
            <input type="text" name="name" value={addProduct.name} onChange={(e) => setAddProduct({ ...addProduct, name: e.target.value })} placeholder="Nome" required />
            <textarea name="description" value={addProduct.description} onChange={(e) => setAddProduct({ ...addProduct, description: e.target.value })} placeholder="Descrição" required />
            <input type="number" name="price" value={addProduct.price} onChange={(e) => setAddProduct({ ...addProduct, price: e.target.value })} placeholder="Preço" required />
            <select name="category" value={addProduct.category} onChange={(e) => setAddProduct({ ...addProduct, category: e.target.value })} required>
              <option value="">Selecionar Categoria</option>
              <option value="maquiagem">Maquiagem</option>
              <option value="skincare">Skin Care</option>
              <option value="banho">Banho</option>
              <option value="farmacia">Farmácia</option>
            </select>
            <br />
            <button type="submit" style={{ backgroundColor: 'mediumaquamarine' }}>Salvar</button>
            <button type="button" onClick={() => setShowAddForm(false)} style={{ backgroundColor: 'red' }}>Cancelar</button>
          </form>
        </div>
      )}

      {editProduct && (
        <div className="modal" style={{ backgroundColor: 'rgba(0,0,0,0.7)', padding: '20px' }}>
          <h2 style={{ color: 'white' }}>Editar Produto</h2>
          <form onSubmit={handleSave}>
            <input type="text" name="name" value={editProduct.name} onChange={(e) => setEditProduct({ ...editProduct, name: e.target.value })} required />
            <textarea name="description" value={editProduct.description} onChange={(e) => setEditProduct({ ...editProduct, description: e.target.value })} required />
            <input type="number" name="price" value={editProduct.price} onChange={(e) => setEditProduct({ ...editProduct, price: e.target.value })} required />
            <select name="category" value={editProduct.category} onChange={(e) => setEditProduct({ ...editProduct, category: e.target.value })} required>
              <option value="maquiagem">Maquiagem</option>
              <option value="skincare">Skin Care</option>
              <option value="banho">Banho</option>
              <option value="farmacia">Farmácia</option>
            </select>
            <button type="submit" style={{ backgroundColor: 'yellowgreen' }}>Salvar</button>
            <button type="button" onClick={() => setEditProduct(null)} style={{ backgroundColor: 'red' }}>Cancelar</button>
          </form>
        </div>
      )}

      {/* Gerenciar Pedidos */}
      <h2 style={{ marginBottom: '20px', color: 'white' }}>Gerenciar Pedidos</h2>
      {orders.length ? (
        <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center' }}>
          {orders.map(order => (
            <div key={order.id} style={{ backgroundColor: '#fff', margin: '20px', width: '300px', padding: '15px', border: '1px solid #ddd', borderRadius: '12px' }}>
              <h3>Pedido #{order.id}</h3>
              <p>Cliente: {order.customer || 'Cliente não encontrado'}</p>
              <p style={{ color: '#FF6347' }}>Total: R${order.total}</p>
              <div style={{ marginTop: '10px' }}>
              <select value={order.status} onChange={(e) => handleUpdateStatus(order.id, e.target.value)}>
                <option value="Pendente">Pendente</option>
                <option value="Concluído">Concluído</option>
                <option value="Cancelado">Cancelado</option>
              </select>


                <h4 style={{ color: getStatusColor(order.status) }}>Status: {order.status}</h4>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <p style={{ color: 'white' }}>Nenhum pedido disponível.</p>
      )}
    </div>
  );
};

export default Admin;