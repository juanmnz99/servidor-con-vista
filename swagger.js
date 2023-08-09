const swaggerJSDoc = require('swagger-jsdoc');
const swaggerUI = require('swagger-ui-express');

const options = {
  definition: {
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
  },
  apis: ['./routes/*.js'], 
};

const swaggerSpec = swaggerJSDoc(options);

module.exports = (app) => {
  app.use('/api-docs', swaggerUI.serve, swaggerUI.setup(swaggerSpec));
};
