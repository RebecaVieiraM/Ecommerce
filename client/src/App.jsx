import React from 'react';
import { Routes, Route } from 'react-router-dom'
import Home from './pages/Home';
import Profile from './pages/Profile';
import Admin from './pages/Admin';
import Login from './pages/Login';
import Register from './pages/Register'; 
import Cart from './pages/Cart';
import OrderHistory from './pages/OrderHistory';
import PrivateRoute from './components/PrivateRoute';

function App() {

  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} /> 
      <Route path="/cart" element={<Cart />} /> 
      <Route path="/history" element={<OrderHistory />} /> 
      

      {/* Rotas protegidas */}
      <Route element={<PrivateRoute roles={['user', 'admin']} />}>
        <Route path="/profile" element={<Profile />} />
      </Route>

      <Route element={<PrivateRoute roles={['admin']} />}>
        <Route path="/admin" element={<Admin />} />
      </Route>
    </Routes>
  );
};

export default App;
