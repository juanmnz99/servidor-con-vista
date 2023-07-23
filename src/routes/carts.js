
const express = require('express');
const router = express.Router();
const cartsController = require('../controllers/cartsController');

router.post('/:cid/purchase', cartsController.finalizarCompra);

module.exports = router;
