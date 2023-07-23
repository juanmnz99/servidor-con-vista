
const ProductoRepository = require('../repositories/productoRepository');

class ProductosController {
  constructor(daoType) {
    this.productoRepository = new ProductoRepository(daoType);
  }

  async obtenerProductos(req, res) {
    try {
      const productos = await this.productoRepository.obtenerProductos();
      res.json(productos);
    } catch (error) {
      res.status(500).json({ error: 'Error al obtener los productos' });
    }
  }

  
}

module.exports = ProductosController;
