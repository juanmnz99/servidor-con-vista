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
