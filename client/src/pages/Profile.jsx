import React, { useEffect, useState } from 'react';
import api from '../service';
import ProductsCard from '../components/ProductsCard';
import { Link } from 'react-router-dom';

const Profile = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [orders, setOrders] = useState([]);
  const [quantities, setQuantities] = useState({});

  useEffect(() => {
    loadProducts();
    loadOrders();
  }, []);

  const loadProducts = async () => {
    setLoading(true);
    try {
      const response = await api.get('/products');
      setProducts(response.data);
    } finally { 
      setLoading(false); 
    }
  };

  const loadOrders = async () => {
    try {
      const response = await api.get("/orders");
      setOrders(response.data);
    } catch (error) { console.error(error); }
  };

  const handleQuantityChange = (productId, change) => {
    setQuantities(prev => ({ 
      ...prev, [productId]: Math.max((prev[productId] || 1) + change, 1) 
    }));
  };

  const handleSaveToCart = (productId) => {
    const product = products.find(p => p.id === productId);
    const quantity = quantities[productId] || 1;
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    const existingProduct = cart.find(item => item.id === productId);

    if (existingProduct) existingProduct.quantity += quantity;
    else cart.push({ ...product, quantity });

    localStorage.setItem('cart', JSON.stringify(cart));
  };

  const handleCheckout = () => {
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    if (!cart.length) return alert("O carrinho está vazio.");

    setOrders([...orders, { id: orders.length + 1, status: "Pendente", products: cart }]);
    localStorage.removeItem('cart');
    setQuantities({});
    alert("Compra finalizada com sucesso!");
  };

  return (
    <div style={{ padding: '20px', fontFamily: 'Arial, sans-serif', textAlign: 'center', color: 'black' }}>
      <h1 style={{ marginBottom: '20px', color: 'white'  }}>Lista de Produtos</h1>
      <Link to="/cart" style={{ marginBottom: '20px', display: 'block' , color: 'mediumaquamarine' }}>Carrinho</Link>

      {loading ? <p>Carregando...</p> : (
        <div>
          {products.map(product => (
            <div 
              key={product.id} 
              style={{ 
                margin: '20px auto', 
                width: '300px', 
                height: 'auto',  
                border: '1px solid #ddd', 
                borderRadius: '12px', 
                padding: '15px', 
                backgroundColor: '#fff',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
                overflow: 'hidden' 
              }}
            >
              <ProductsCard {...product} />
              <div style={{ marginTop: '10px' }}>
                <div>
                  <p style={{ 
                    fontSize: '20px',  
                    color: '#FF6347',  
                    fontWeight: 'bold'
                  }}>
                    R$ {product.price}
                  </p>
                </div>
                <div style={{ marginTop: '10px' }}>
                  <button onClick={() => handleSaveToCart(product.id)}>Adicionar ao Carrinho</button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      <div style={{ marginTop: '20px' }}>
        <button style={{ backgroundColor: 'mediumaquamarine', color: 'black', fontWeight: 'bold' }} onClick={handleCheckout}>Finalizar Compra</button>
      </div>

      <Link to="/history" style={{ marginTop: '40px', color: 'white' }}>Meus Pedidos</Link>
    </div>
  );
};

export default Profile;
