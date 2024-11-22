import React from 'react';

const HomePage = ({ onLoginClick, onRegisterClick }) => {
  return (
    <div>
      <header className="header">
        <button className="login" onClick={onLoginClick}>Iniciar Sesión</button>
        <button className="login" onClick={onRegisterClick}>Registrarse</button>
      </header>

      <main className="main">
      <h1 className="principalT">Proyecto web y sistemas móviles</h1>
      <p className="principal">Daniel Andrés Pinzón Jay</p>
      <p className="principal">Yeimy Tatiana Corzo Lizarazo</p>
      </main>

      <footer className="footer"></footer>
    </div>
  );
};

export default HomePage;
