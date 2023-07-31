
const express = require('express');
const app = express();
const productsRouter = require('./routes/products');
const logger = require('./logger'); 


app.get('/mockingproducts', (req, res) => {
  const mockProducts = generateMockProducts();
  res.json(mockProducts);
});


app.use('/api/products', productsRouter);


app.get('/loggerTest', (req, res) => {
  logger.debug('Este es un mensaje de debug');
  logger.info('Este es un mensaje de info');
  logger.warn('Este es un mensaje de warning');
  logger.error('Este es un mensaje de error');
 
  throw new Error('Este es un error fatal');
});

app.use((err, req, res, next) => {
  logger.error(err.stack);
  res.status(500).send('Algo salió mal!');
});

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  logger.info(`Servidor corriendo en el puerto ${PORT}`);
});
