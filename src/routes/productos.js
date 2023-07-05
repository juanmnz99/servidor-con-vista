/*const express = require('express');
const router = express.Router();
const Product = require('../models/Product');

// GET /api/products
router.get('/', async (req, res) => {
  try {
    const limit = parseInt(req.query.limit) || 10;
    const page = parseInt(req.query.page) || 1;
    const sort = req.query.sort || '';
    const query = req.query.query || '';
    
    // Construir el objeto de filtro
    const filter = {};
    if (query) {
      filter.$or = [
        { category: { $regex: query, $options: 'i' } },
        { availability: { $regex: query, $options: 'i' } }
      ];
    }
    
    // Contar el total de productos
    const totalCount = await Product.countDocuments(filter);
    
    // Calcular el total de páginas y ajustar la página actual
    const totalPages = Math.ceil(totalCount / limit);
    const adjustedPage = Math.min(page, totalPages);
    
    // Calcular el índice de inicio y fin para la consulta
    const startIndex = (adjustedPage - 1) * limit;
    const endIndex = adjustedPage * limit;
    
    // Construir el objeto de ordenamiento
    const sortOptions = {};
    if (sort === 'asc') {
      sortOptions.price = 1;
    } else if (sort === 'desc') {
      sortOptions.price = -1;
    }
    
    // Consultar los productos con paginación y ordenamiento
    const products = await Product.find(filter)
      .sort(sortOptions)
      .limit(limit)
      .skip(startIndex)
      .exec();
    
    // Construir el objeto de respuesta
    const response = {
      status: 'success',
      payload: products,
      totalPages: totalPages,
      prevPage: adjustedPage > 1 ? adjustedPage - 1 : null,
      nextPage: adjustedPage < totalPages ? adjustedPage + 1 : null,
      page: adjustedPage,
      hasPrevPage: adjustedPage > 1,
      hasNextPage: adjustedPage < totalPages,
      prevLink: adjustedPage > 1 ? `/api/products?limit=${limit}&page=${adjustedPage - 1}&sort=${sort}&query=${query}` : null,
      nextLink: adjustedPage < totalPages ? `/api/products?limit=${limit}&page=${adjustedPage + 1}&sort=${sort}&query=${query}` : null
    };
    
    res.json(response);
  } catch (error) {
    console.error(error);
    res.status(500).json({ status: 'error', message: 'Internal Server Error' });
  }
});

module.exports = router;*/
// productos.js
const express = require('express');
const router = express.Router();
const productosController = require('../controllers/productosController');

router.get('/', productosController.obtenerProductos);

router.post('/', productosController.crearProducto);

router.get('/:id', productosController.obtenerProductoPorId);

router.put('/:id', productosController.actualizarProducto);

router.delete('/:id', productosController.eliminarProducto);

module.exports = router;

