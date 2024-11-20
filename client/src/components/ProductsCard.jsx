import React from 'react';

function ProductsCard({ name, description}) {
    return(
        <div className="card" style={{ border: '1px solid #ccc', margin: '10px', padding: '10px' }}>
            <div className="divCard">
                <div className="div1">
                    <h1>{name}</h1>
                </div>
                <div>
                    <h3>Descrição: {description}</h3>
                </div>
            </div>
            
        </div>
    )
}

export default ProductsCard;