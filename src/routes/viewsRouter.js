const express = require('express');
const router = express.Router();

router.get('/realTimeProducts', (req, res) => {
  res.render('realTimeProducts', {
    products: [
      {
        title: 'Producto 1',
        description: 'Descripción del producto 1',
        price: 100,
        stock: 10,
      },
      {
        title: 'Producto 2',
        description: 'Descripción del producto 2',
        price: 200,
        stock: 5,
      },
      {
        title: 'Producto 3',
        description: 'Descripción del producto 3',
        price: 300,
        stock: 2,
      },
    ],
  });
});

module.exports = router;


const express = require('express');
const productosController = require('./controllers/productosController');
const carritoController = require('./controllers/carritoController');
const compraController = require('./controllers/compraController');

// Rutas para la visualización de productos
router.get('/productos', productosController.listaProductos);
router.get('/productos/:id', productosController.detalleProducto);

// Rutas para el carrito de compras
router.get('/carrito', carritoController.vistaCarrito);
router.post('/carrito/agregar', carritoController.agregarAlCarrito);
router.post('/carrito/completar', carritoController.completarCompra);

// Rutas para el historial de compras
router.get('/compras/resumen', compraController.resumenCompra);
router.get('/compras/historial', compraController.historialCompras);

module.exports = router;
