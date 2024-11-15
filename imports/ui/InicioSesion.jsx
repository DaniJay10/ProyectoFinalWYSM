import React, { useState } from 'react';
import { Meteor } from 'meteor/meteor';

const InicioSesion = ({ onLoginSuccess }) => {
  const [formData, setFormData] = useState({
    username: '',
    password: ''
  });

  const [loginMessage, setLoginMessage] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (formData.username === 'admin' && formData.password === '1234') {
      onLoginSuccess(formData.username, true); 
    } else {
      Meteor.call('login.usuario', formData.username, formData.password, (error, result) => {
        if (error) {
          alert(error.reason);
        } else {
          alert(result.message);
          onLoginSuccess(formData.username, false); 
        }
      });
    }
  };

  return (
    <div className="login-container">
      <h2 className="login-title">Iniciar Sesión</h2>
      <form className="login-form" onSubmit={handleSubmit}>
        <label>
          Usuario:
          <input type="text" name="username" value={formData.username} onChange={handleChange} />
        </label>
        <br />
        <label>
          Contraseña:
          <input type="password" name="password" value={formData.password} onChange={handleChange} />
        </label>
        <br />
        <button className="login-button" type="submit">Iniciar Sesión</button>
      </form>

      {loginMessage && <p>{loginMessage}</p>} 
    </div>
    
  );
};


export default InicioSesion;
