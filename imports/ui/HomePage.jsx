import React from 'react';

const HomePage = ({ onLoginClick, onRegisterClick }) => {
  return (
    <div>
      <header className="header">
        <button className="login" onClick={onLoginClick}>Iniciar Sesión</button>
        <button className="login" onClick={onRegisterClick}>Registrarse</button>
      </header>

      <main className="main">
        <h1>Bienvenido a nuestra aplicación</h1>
        <p>Contenido inicial</p>
      </main>

      <footer className="footer"></footer>
    </div>
  );
};

export default HomePage;
