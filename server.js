
const express = require('express');
const app = express();
const productsRouter = require('./routes/products');
const { generateMockProducts } = require('./routes/mockData'); 


app.get('/mockingproducts', (req, res) => {
  const mockProducts = generateMockProducts();
  res.json(mockProducts);
});


app.use('/api/products', productsRouter);


const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const passport = require('passport');
const authRoutes = require('./routes/auth');
const productosRoutes = require('./routes/productos');
const cartsRoutes = require('./routes/carts'); 

dotenv.config();
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

app.use(express.json());
app.use(passport.initialize());

app.use('/api/auth', authRoutes);
app.use('/api/productos', productosRoutes);
app.use('/api/carts', cartsRoutes); 

app.listen(8080, () => {
  console.log('Servidor iniciado en el puerto 8080');
});
