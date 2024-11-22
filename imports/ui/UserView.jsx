import React, { useEffect, useState } from 'react';
import { Meteor } from 'meteor/meteor';
import FormularioCompra from './FormularioCompra';
import CartView from './CartView';

const UserView = ({ username }) => {
  const [productos, setProductos] = useState([]); 
  const [productoSeleccionado, setProductoSeleccionado] = useState(null); 
  const [verCarrito, setVerCarrito] = useState(false); 

  useEffect(() => {
    Meteor.call('productos.obtener', (error, response) => {
      if (error) {
        console.error('Error al obtener productos:', error.message);
        alert('Error al obtener productos: ' + error.message);
      } else {
        setProductos(response);
      }
    });
  }, []);


  if (productoSeleccionado) {
    return (
      <FormularioCompra
        producto={productoSeleccionado}
        username={username}
        onBack={() => setProductoSeleccionado(null)} 
      />
    );
  }


  if (verCarrito) {
    return (
      <CartView
        username={username} 
        onBack={() => setVerCarrito(false)} 
      />
    );
  }
 
  const handleAgregarAlCarrito = (producto) => {
    Meteor.call('carrito.agregar', producto.nombre, username, (error, response) => {
      if (error) {
        console.error('Error al agregar al carrito:', error.message);
        alert('Error al agregar al carrito: ' + error.message);
      } else {
        console.log(response.message);
        alert(`Producto "${producto.nombre}" agregado al carrito.`);
      }
    });
  };

  return (
    <div>
      <h1>Bienvenido, {username}</h1>
      <h2>Productos disponibles:</h2>
      <div className="products-container">
        {productos.map((producto) => (
          <div key={producto.id} className="product-card">
            <h3>{producto.nombre}</h3>
            <p>{producto.descripcion}</p>
            <p>Precio: ${producto.precio.toFixed(2)}</p>
            <button
              className="buy-button2"
              onClick={() => handleAgregarAlCarrito(producto)} 
            >
              Agregar al carrito
            </button>
            <button
              className="buy-button3"
              onClick={() => setProductoSeleccionado(producto)} 
            >
              Comprar
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default UserView;
