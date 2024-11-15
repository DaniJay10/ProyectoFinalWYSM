import React, { useState } from 'react';
import { Meteor } from 'meteor/meteor';

const AdminView = () => {
  const [nombre, setNombre] = useState('');
  const [descripcion, setDescripcion] = useState('');
  const [precio, setPrecio] = useState('');

  const handleCrearProducto = () => {
    if (!nombre || !precio) {
      alert('Por favor, llena todos los campos obligatorios');
      return;
    }

    Meteor.call(
      'producto.crear',
      nombre,
      descripcion,
      parseFloat(precio),
      (error, response) => {
        if (error) {
          alert('Error al crear producto: ' + error.message);
        } else {
          alert(response.message);
          setNombre('');
          setDescripcion('');
          setPrecio('');
        }
      }
    );
  };

  return (
    <div>
      <h1>Bienvenido, administrador</h1>
      <div>
        <input
          type="text"
          placeholder="Nombre del producto"
          value={nombre}
          onChange={(e) => setNombre(e.target.value)}
        />
        <textarea
          placeholder="Descripción"
          value={descripcion}
          onChange={(e) => setDescripcion(e.target.value)}
        />
        <input
          type="number"
          placeholder="Precio"
          value={precio}
          onChange={(e) => setPrecio(e.target.value)}
        />
        <button onClick={handleCrearProducto}>Crear Producto</button>
      </div>
    </div>
  );
};

export default AdminView;
