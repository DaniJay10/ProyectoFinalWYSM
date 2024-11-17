import React, { useState } from 'react';

const FormularioCompra = ({ producto, onBack }) => {
  const [direccion, setDireccion] = useState('');
  const [metodoPago, setMetodoPago] = useState('');

  const handleConfirmarCompra = () => {
    if (!direccion || !metodoPago) {
      alert('Por favor, completa todos los campos.');
      return;
    }
    alert(`Compra confirmada para el producto: ${producto.nombre}\nDirección: ${direccion}\nMétodo de Pago: ${metodoPago}`);
    onBack(); 
  };

  return (
<div className="formulario-compra-container">
  <button onClick={onBack} className="login">Volver</button>
  <h1>Formulario de Compra</h1>
  <p><strong>Producto seleccionado:</strong> {producto.nombre}</p>
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

export default FormularioCompra;
