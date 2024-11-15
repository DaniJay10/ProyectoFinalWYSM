import React, { useEffect, useState } from 'react';
import { Meteor } from 'meteor/meteor';

const UserView = ({ username }) => {
  const [productos, setProductos] = useState([]);

  useEffect(() => {
    Meteor.call('productos.obtener', (error, response) => {
      if (error) {
        console.error('Error al obtener productos:', error.message);
        alert('Error al obtener productos: ' + error.message);
      } else {
        console.log('Productos obtenidos:', response); // Verifica los datos
        setProductos(response);
      }
    });
  }, []);

  return (
    <div>
      <h1>Bienvenido, {username}</h1>
      <h2>Productos disponibles:</h2>
      <ul>
        {productos.map((producto) => (
          <li key={producto.id}>
            <h3>{producto.nombre}</h3>
            <p>{producto.descripcion}</p>
            <p>Precio: ${producto.precio.toFixed(2)}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default UserView;
