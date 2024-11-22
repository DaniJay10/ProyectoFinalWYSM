import React, { useEffect, useState } from 'react';
import FormularioCompraCarrito from './FormularioCompraCarrito'; 

const CartView = ({ username, onBack }) => {
  const [productosCarrito, setProductosCarrito] = useState([]);
  const [showFormularioCompra, setShowFormularioCompra] = useState(false);

  useEffect(() => {
    Meteor.call('carrito.obtener', username, (error, response) => {
      if (error) {
        console.error('Error al obtener productos del carrito:', error.message);
        alert('Error al cargar el carrito: ' + error.message);
      } else {
        setProductosCarrito(response);
      }
    });
  }, [username]);

  if (showFormularioCompra) {
    return (
      <FormularioCompraCarrito
        productos={productosCarrito}
        username={username}
        onBack={() => setShowFormularioCompra(false)} 
      />
    );
  }

  return (
    <div className="cart-view-container">
      <button onClick={onBack} className="back-button">Volver</button>
      <h1>Carrito de Compras</h1>
      {productosCarrito.length === 0 ? (
        <p>No hay productos en tu carrito.</p>
      ) : (
        <div className="cart-items">
          {productosCarrito.map((producto, index) => (
            <div key={index} className="cart-item">
              <p>{producto.producto}</p>
            </div>
          ))}
        </div>
      )}
      {productosCarrito.length > 0 && (
        <button onClick={() => setShowFormularioCompra(true)} className="buy-button">
          Comprar Todo
        </button>
      )}
    </div>
  );
};

export default CartView;
