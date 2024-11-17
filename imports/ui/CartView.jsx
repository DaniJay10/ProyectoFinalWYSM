import React from 'react';

const CartView = ({ onBack }) => {
  return (
    <div>
      <button onClick={onBack} className="login">Volver</button>
      <h1>Carrito de Compras</h1>
      <p>Aquí aparecerán los productos seleccionados.</p>
    </div>
  );
};

export default CartView;
