import React, { useEffect, useState } from 'react';
import { Meteor } from 'meteor/meteor';
import FormularioCompra from './FormularioCompra';

const UserView = ({ username }) => {
  const [productos, setProductos] = useState([]);
  const [productoSeleccionado, setProductoSeleccionado] = useState(null);

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
        onBack={() => setProductoSeleccionado(null)}
      />
    );
  }

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
              className="buy-button"
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
