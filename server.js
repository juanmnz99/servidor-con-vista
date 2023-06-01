const express = require('express');
const app = express();
const path = require('path');
const exphbs = require('express-handlebars');


app.engine('handlebars', exphbs());
app.set('view engine', 'handlebars');


app.use(express.json());


const productsRouter = require('./routes/products');
const cartsRouter = require('./routes/carts');


app.use(express.static(path.join(__dirname, 'public')));


app.use('/api/products', productsRouter);
app.use('/api/carts', cartsRouter);


app.get('/', (req, res) => {
  res.render('index', {
    title: 'E-commerce',
    message: 'Bienvenido al E-commerce',
  });
});


app.listen(8080, () => {
  console.log('Servidor escuchando en el puerto 8080');
});
