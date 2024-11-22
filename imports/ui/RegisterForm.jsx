import React, { useState } from 'react';
import { Meteor } from 'meteor/meteor';
import { useNavigate } from 'react-router-dom';

const RegisterForm = () => {
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: ''
  });
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    Meteor.call('registro.usuario', formData.username, formData.email, formData.password, (error, result) => {
      if (error) {
        alert(`Error: ${error.message}`);
      } else {
        alert(result.message);
        navigate('/'); 
      }
    });
  };

  return (
    <div className="register-container">
      <h2 className="register-title">Registrarse</h2>
      <form className="register-form" onSubmit={handleSubmit}>
        <label>
          Usuario:
          <input type="text" name="username" value={formData.username} onChange={handleChange} />
        </label>
        <br />
        <label>Correo:
          <input type="email" name="email" value={formData.email} onChange={handleChange} />
        </label>
        <br />
        <label>Contraseña:
          <input type="password" name="password" value={formData.password} onChange={handleChange} />
        </label>
        <br />
        <button className="register-button" type="submit">Registrarse</button>
      </form>
    </div>
  );
};

export default RegisterForm;
