import React, { useState } from 'react';
import { Meteor } from 'meteor/meteor';

const AdminView = () => {
  // Estado crear producto
  const [nombre, setNombre] = useState('');
  const [descripcion, setDescripcion] = useState('');
  const [precio, setPrecio] = useState('');

  // Estados neditar producto
  const [productoEditar, setProductoEditar] = useState('');
  const [nuevoNombre, setNuevoNombre] = useState('');
  const [nuevaDescripcion, setNuevaDescripcion] = useState('');
  const [nuevoPrecio, setNuevoPrecio] = useState('');

  // Estado eliminar producto
  const [productoEliminar, setProductoEliminar] = useState('');

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

  const handleEditarProducto = () => {
    if (!productoEditar) {
      alert('Por favor, llena el campo "Nombre del producto a editar"');
      return;
    }

    alert(
      `Producto a editar: ${productoEditar}, Nuevo nombre: ${nuevoNombre}, Descripción: ${nuevaDescripcion}, Precio: ${nuevoPrecio}`
    );
    
    Meteor.call(
      'producto.editar',
      productoEditar,
      nuevoNombre,
      nuevaDescripcion,
      nuevoPrecio,
      (error, response) => {
        if (error) {
          alert('Error al editar producto: ' + error.message);
        } else {
          alert(response.message); 
          setProductoEditar(''); 
          setNuevoNombre('');
          setNuevaDescripcion('');
          setNuevoPrecio('');
        }
      }
    );

    setProductoEditar('');
    setNuevoNombre('');
    setNuevaDescripcion('');
    setNuevoPrecio('');
  };

  const handleEliminarProducto = () => {
    if (!productoEliminar) {
      alert('Por favor, ingresa el nombre del producto a eliminar');
      return;
    }
    Meteor.call('producto.eliminar', productoEliminar, (error, response) => {
      if (error) {
        alert('Error al eliminar producto: ' + error.message);
      } else {
        alert(response.message); 
        setProductoEliminar(''); 
      }
    });

    alert(`Producto a eliminar: ${productoEliminar}`);
    setProductoEliminar('');
  };

  return (
    <div className="admin-form-container">
      <h1 className="admin-title">Bienvenido, administrador</h1>
      <div className="form-row">
        <div className="form">
          <h2>Crear Producto</h2>
          <input
            type="text"
            placeholder="Nombre del producto"
            className="form-input"
            value={nombre}
            onChange={(e) => setNombre(e.target.value)}
          />
          <textarea
            placeholder="Descripción"
            className="form-textarea"
            value={descripcion}
            onChange={(e) => setDescripcion(e.target.value)}
          />
          <input
            type="number"
            placeholder="Precio"
            className="form-input"
            value={precio}
            onChange={(e) => setPrecio(e.target.value)}
          />
          <button className="form-button" onClick={handleCrearProducto}>
            Crear Producto
          </button>
        </div>

        <div className="form">
          <h2>Editar Producto</h2>
          <input
            type="text"
            placeholder="Nombre del producto a editar"
            className="form-input"
            value={productoEditar}
            onChange={(e) => setProductoEditar(e.target.value)}
          />
          <input
            type="text"
            placeholder="Nuevo nombre del producto"
            className="form-input"
            value={nuevoNombre}
            onChange={(e) => setNuevoNombre(e.target.value)}
          />
          <textarea
            placeholder="Descripción"
            className="form-textarea"
            value={nuevaDescripcion}
            onChange={(e) => setNuevaDescripcion(e.target.value)}
          />
          <input
            type="number"
            placeholder="Precio"
            className="form-input"
            value={nuevoPrecio}
            onChange={(e) => setNuevoPrecio(e.target.value)}
          />
          <button className="form-button" onClick={handleEditarProducto}>
            Editar Producto
          </button>
        </div>

        <div className="form">
          <h2>Eliminar Producto</h2>
          <input
            type="text"
            placeholder="Nombre del producto a eliminar"
            className="form-input"
            value={productoEliminar}
            onChange={(e) => setProductoEliminar(e.target.value)}
          />
          <button className="form-button" onClick={handleEliminarProducto}>
            Eliminar Producto
          </button>
        </div>
      </div>
    </div>
  );
};

export default AdminView;
