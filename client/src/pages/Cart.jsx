import React, { useEffect, useState } from 'react';
import ProductsCard from '../components/ProductsCard';
import { Link, Navigate } from 'react-router-dom';
import api from '../service';

const Cart = () => {
  const [cartItems, setCartItems] = useState([]);
  const [total, setTotal] = useState(0);

  useEffect(() => {
    const storedCartItems = JSON.parse(localStorage.getItem('cart')) || [];
    setCartItems(storedCartItems);
    calculateTotal(storedCartItems);
  }, []);

  const calculateTotal = (items) => {
    const total = items.reduce((acc, item) => acc + item.price * item.quantity, 0);
    setTotal(total);
  };

  const updateCartQuantity = (id, change) => {
    const updatedCartItems = cartItems.map(item => {
      if (item.id === id) {
        const newQuantity = item.quantity + change;
        return { ...item, quantity: Math.max(newQuantity, 1) }; 
      }
      return item;
    }).filter(item => item.quantity > 0); 

    setCartItems(updatedCartItems);
    localStorage.setItem('cart', JSON.stringify(updatedCartItems));
    calculateTotal(updatedCartItems); 
  };

  const removeFromCart = (id) => {
    const updatedCartItems = cartItems.filter(item => item.id !== id); 
    setCartItems(updatedCartItems);
    localStorage.setItem('cart', JSON.stringify(updatedCartItems));
    calculateTotal(updatedCartItems); 
  };

  const finalizePurchase = async () => {
    try {
      const products = cartItems.map(item => ({
        name: item.name,
        price: item.price,
        quantity: item.quantity,
      }));

      await api.post('/orders', { products, total });
      alert("Compra finalizada!");
      setCartItems([]);
      setTotal(0);
      localStorage.removeItem('cart');
    } catch (error) {
      console.error('Erro ao finalizar compra:', error);
    }
  };

  return (
    <div style={{
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center',
      height: '100vh',
      padding: '20px'
    }}>
      <h2>Carrinho de Compras</h2>
      {cartItems.length === 0 ? (
        <p>Seu carrinho está vazio.</p>
      ) : (
        <ul style={{ listStyle: 'none',  border: '1px solid #ccc', margin: '10px', padding: '10px' }}>
          {cartItems.map(item => (
            <li key={item.id} 
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
              overflow: 'hidden',
              color: 'black',
              alignItems: 'center' 
            }}>
              <ProductsCard  
                name={item.name} 
                description={item.description} 
              />
              <p style={{ 
                    fontSize: '20px',  
                    color: '#FF6347',  
                    fontWeight: 'bold'}}> R$ {item.price}</p>

              <div>
                <button onClick={() => updateCartQuantity(item.id, -1)}>-</button>
                <span style={{ margin: '0 10px' }}>Quantidade: {item.quantity}</span>
                <button onClick={() => updateCartQuantity(item.id, 1)}>+</button>
              </div>
              <button onClick={() => removeFromCart(item.id)}>Remover</button>
            </li>
          ))}
        </ul>
      )}
      <h1>{`Total: R$ ${total.toFixed(2)}`}</h1>
      {/*<button onClick={finalizePurchase}>Finalizar Compra</button>*/}
      <Link onClick={finalizePurchase} to="https://www.visa.com.br/pague-com-visa/click-to-pay.html">Finalizar Compra</Link>
      <Link to="/profile">Voltar para Produtos</Link>
    </div>
  );
};

export default Cart;
