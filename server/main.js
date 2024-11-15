import { Meteor } from 'meteor/meteor';
import connection from './mysqlconexion';
//REGISTRO DE USUARIOS
Meteor.methods({
  async 'registro.usuario'(username, email, password) {
    try {
      const query = `INSERT INTO usuarios (username, email, password) VALUES ('${username}', '${email}', '${password}')`;
      await connection.query(query);
      return { success: true, message: `Usuario ${username} registrado correctamente` };
    } catch (error) {
      throw new Meteor.Error('Error al registrar usuario', error.message);
    }
  },
  async 'login.usuario'(username, password) {
    try {
      const query = `SELECT * FROM usuarios WHERE username = '${username}' AND password = '${password}'`;
      const [rows] = await connection.query(query);
      
      if (rows.length > 0) {
        return { success: true, message: `Inicio de sesión exitoso para ${username}` };
      } else {
        throw new Meteor.Error('Usuario no encontrado o contraseña incorrecta');
      }
    } catch (error) {
      throw new Meteor.Error('Error al iniciar sesión', error.message);
    }
  }
});
//REGISTRO DE PRODUCTOS
Meteor.methods({
  async 'producto.crear'(nombre, descripcion, precio) {
    try {
      const query = `
        INSERT INTO productos (nombre, descripcion, precio) 
        VALUES ('${nombre}', '${descripcion}', ${precio})
      `;
      await connection.query(query);
      return { success: true, message: `Producto ${nombre} creado exitosamente` };
    } catch (error) {
      throw new Meteor.Error('Error al crear producto', error.message);
    }
  },

  async 'productos.obtener'() {
    try {
      const query = `SELECT * FROM productos`;
      const [rows] = await connection.query(query);
      return rows;
    } catch (error) {
      throw new Meteor.Error('Error al obtener productos', error.message);
    }
  }
});


