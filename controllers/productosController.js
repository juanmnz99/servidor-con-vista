
const Producto = require('../models/producto');

const productosController = {
  obtenerProductos: async (req, res) => {
    try {
      const productos = await Producto.find();
      res.json(productos);
    } catch (error) {
      res.status(500).json({ error: 'Error al obtener los productos' });
    }
  },

 
};

module.exports = productosController;
