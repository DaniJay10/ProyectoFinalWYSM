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
        INSERT INTO productos (nombre, descripcion, precio) VALUES ('${nombre}', '${descripcion}', ${precio}) `;
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
  } ,   async 'producto.editar'(nombreActual, nuevoNombre, nuevaDescripcion, nuevoPrecio) {
    try {
      const actualizaciones = [];
      if (nuevoNombre) {
        actualizaciones.push(`nombre = '${nuevoNombre}'`);
      }
      if (nuevaDescripcion) {
        actualizaciones.push(`descripcion = '${nuevaDescripcion}'`);
      }
      if (nuevoPrecio) {
        actualizaciones.push(`precio = ${parseFloat(nuevoPrecio)}`);
      }

      if (actualizaciones.length === 0) {
        throw new Meteor.Error('No hay datos para actualizar');
      }

      const query = `
        UPDATE productos SET ${actualizaciones.join(', ')} WHERE nombre = '${nombreActual}'`;

      await connection.query(query);

      return { success: true, message: `Producto ${nombreActual} actualizado exitosamente` };
    } catch (error) {
      throw new Meteor.Error('Error al editar producto', error.message);
    }
  },

  async 'producto.eliminar'(nombre) {
    try {
      const query = `DELETE FROM productos WHERE nombre = '${nombre}'`;
      await connection.query(query);
      return { success: true, message: `Producto ${nombre} eliminado exitosamente` };
    } catch (error) {
      throw new Meteor.Error('Error al eliminar producto', error.message);
    }
  }
});


//REALIZAR COMPRA/AGREGAR AL CARRITO
Meteor.methods({
  async 'registro.compra'(producto, username, direccion, metodoPago) {
    try {
      const query = `INSERT INTO compras (producto, usuario, direccion, metodo_pago) VALUES ('${producto}', '${username}', '${direccion}', '${metodoPago}')`;
      await connection.query(query);
      return { success: true, message: 'Compra registrada correctamente' };
    } catch (error) {
      throw new Meteor.Error('Error al registrar la compra', error.message);
    }
  },
  async 'carrito.agregar'(nombreProducto, username) {
    try {
      const query = `
        INSERT INTO carrito (producto, usuario) VALUES ('${nombreProducto}', '${username}')`;
      await connection.query(query);
      return { success: true, message: `Producto ${nombreProducto} agregado al carrito de ${username}` };
    } catch (error) {
      throw new Meteor.Error('Error al agregar al carrito', error.message);
    }
  }, 
  async 'carrito.obtener'(username) {
    try {
      const query = `SELECT producto FROM carrito WHERE usuario = '${username}'`;
      const [rows] = await connection.query(query);
      return rows; 
    } catch (error) {
      throw new Meteor.Error('Error al obtener productos del carrito', error.message);
    }
  }, 
  async 'carrito.vaciar'(username) {
    try {
      const query = `DELETE FROM carrito WHERE usuario = '${username}'`;
      await connection.query(query);
      return { success: true, message: `Carrito vaciado para el usuario: ${username}` };
    } catch (error) {
      throw new Meteor.Error('Error al vaciar el carrito', error.message);
    }
  }
  
});
