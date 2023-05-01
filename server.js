const express = require('express');
const app = express();
const server = require('http').Server(app);
const io = require('socket.io')(server);
const productsRouter = require('./routes/products');
const viewsRouter = require('./routes/views');
const handlebars = require('express-handlebars');

app.engine(
  'hbs',
  handlebars({
    extname: 'hbs',
    defaultLayout: 'index.hbs',
    layoutsDir: __dirname + '/views/layouts',
  })
);

app.set('views', './views');
app.set('view engine', 'hbs');

app.use('/api/products', productsRouter);
app.use('/', viewsRouter);

server.listen(8080, () => {
  console.log('Servidor HTTP escuchando en el puerto 8080');
});
