import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const Home = () => {
   
    return(
        <>
        <div style={{ padding: '20px', textAlign: 'center', justifyContent: 'center', color: 'white' }}>
            <h1>On-Beauty</h1>
            <Link to="/Login">Entrar</Link>
        </div>
        </>
    );
};
export default Home;