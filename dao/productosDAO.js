
const Producto = require('../models/producto');

const productosDAO = {
  obtenerProductos: async () => {
    try {
      const productos = await Producto.find();
      return productos;
    } catch (error) {
      throw new Error('Error al obtener los productos');
    }
  },

 
};

module.exports = productosDAO;
