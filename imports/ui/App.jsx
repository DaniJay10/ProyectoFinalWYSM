import React, { useState } from 'react';
import InicioSesion from './InicioSesion';
import RegisterForm from './RegisterForm';
import AdminView from './AdminView';
import UserView from './UserView';
import HomePage from './HomePage';
import CartView from './CartView';

const App = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  const [username, setUsername] = useState('');
  const [showLoginForm, setShowLoginForm] = useState(false);
  const [showRegisterForm, setShowRegisterForm] = useState(false);
  const [products, setProducts] = useState([]); 
  const [showCart, setShowCart] = useState(false); 

  const handleLoginClick = () => {
    setShowLoginForm(true);
    setShowRegisterForm(false);
  };

  const handleRegisterClick = () => {
    setShowRegisterForm(true);
    setShowLoginForm(false);
  };

  const handleLoginSuccess = (username, isAdmin) => {
    setIsAuthenticated(true);
    setUsername(username);
    setIsAdmin(isAdmin);
    setShowLoginForm(false);
    setShowRegisterForm(false);
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    setIsAdmin(false);
    setUsername('');
    setShowCart(false); 
  };

  const handleAddProduct = (product) => {
    setProducts([...products, product]);
  };

  return (
    <div>
      {showRegisterForm ? (
        <RegisterForm />
      ) : showLoginForm ? (
        <InicioSesion onLoginSuccess={handleLoginSuccess} />
      ) : isAuthenticated ? (
        <div>
          <header className="header">
            <p className="welcome-message">Bienvenid@, {username}</p>
            {isAuthenticated && !isAdmin && (
              <button className="carrito" onClick={() => setShowCart(true)}>
                🛒
              </button>
            )}
            <button className="login" onClick={handleLogout}>
              Cerrar Sesión
            </button>
          </header>

          <main className="main">
            {isAdmin ? (
              <AdminView onAddProduct={handleAddProduct} />
            ) : showCart ? (
              <CartView 
                username={username} 
                onBack={() => setShowCart(false)} 
              />
            ) : (
              <UserView username={username} products={products} />
            )}
          </main>

          <footer className="footer"></footer>
        </div>
      ) : (
        <HomePage
          onLoginClick={handleLoginClick}
          onRegisterClick={handleRegisterClick}
        />
      )}
    </div>
  );
};

export default App;
