const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const session = require('express-session');
const passport = require('passport');
const swaggerUI = require('swagger-ui-express');
const swaggerJSDoc = require('swagger-jsdoc');
const winston = require('winston');
const expressWinston = require('express-winston');


const app = express();


app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());


const swaggerDefinition = {
  openapi: '3.0.0',
  info: {
    title: 'E-commerce API',
    version: '1.0.0',
    description: 'API documentation for the E-commerce project',
  },
  servers: [
    {
      url: 'http://localhost:8080',
    },
  ],
};
const options = {
  swaggerDefinition,
  apis: ['./routes/*.js'], 
};
const swaggerSpec = swaggerJSDoc(options);
app.use('/api-docs', swaggerUI.serve, swaggerUI.setup(swaggerSpec));


const logger = winston.createLogger({
  level: 'info', 
  format: winston.format.json(),
  transports: [
    new winston.transports.Console({ format: winston.format.simple() }),
    new winston.transports.File({ filename: 'errors.log', level: 'error' }),
  ],
});
app.use(expressWinston.logger({ winstonInstance: logger }));


const productsRouter = require('./routes/products');
const cartsRouter = require('./routes/carts');
const usersRouter = require('./routes/users');
app.use('/api/products', productsRouter);
app.use('/api/carts', cartsRouter);
app.use('/api/users', usersRouter);


const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
