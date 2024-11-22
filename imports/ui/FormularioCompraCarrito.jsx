import React, { useState } from 'react';

const FormularioCompraCarrito = ({ productos, username, onBack, onUserView }) => {
  const [direccion, setDireccion] = useState('');
  const [metodoPago, setMetodoPago] = useState('');

  const handleConfirmarCompra = () => {
    if (!direccion || !metodoPago) {
      alert('Por favor, completa todos los campos.');
      return;
    }

    productos.forEach((producto) => {
      Meteor.call(
        'registro.compra',
        producto.producto,
        username,
        direccion,
        metodoPago,
        (error) => {
          if (error) {
            console.error(`Error al registrar la compra de ${producto.producto}:`, error.message);
            alert(`Ocurrió un error al registrar la compra de ${producto.producto}.`);
          } else {
            console.log(`Compra registrada exitosamente para ${producto.producto}.`);
          }
        }
      );
    });

    alert('Todas las compras han sido registradas correctamente.');
    onBack(); 
  };

  return (
    <div className="formulario-compra-container">
      <button onClick={onBack} className="login">Volver</button>
      <h1>Formulario de Compra</h1>
      <p><strong>Productos seleccionados:</strong></p>
      <ul>
        {productos.map((producto, index) => (
          <li key={index}>{producto.producto}</li>
        ))}
      </ul>
      <div>
        <label htmlFor="direccion">Dirección:</label>
        <input
          id="direccion"
          type="text"
          value={direccion}
          onChange={(e) => setDireccion(e.target.value)}
          placeholder="Ingresa tu dirección"
        />
      </div>
      <div>
        <label htmlFor="metodoPago">Método de Pago:</label>
        <select
          id="metodoPago"
          value={metodoPago}
          onChange={(e) => setMetodoPago(e.target.value)}
        >
          <option value="">Selecciona</option>
          <option value="Efectivo">Efectivo</option>
          <option value="Tarjeta">Tarjeta</option>
        </select>
      </div>
      <button onClick={handleConfirmarCompra} className="buy-button">
        Confirmar Compra
      </button>
    </div>
  );
};

export default FormularioCompraCarrito;
