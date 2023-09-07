const express = require('express');
const app = express();
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const session = require('express-session');
const passport = require('passport');
const cors = require('cors');
const morgan = require('morgan');
const winston = require('winston');
const expressWinston = require('express-winston');


const logger = winston.createLogger({
  level: 'info',
  format: winston.format.combine(
    winston.format.colorize(),
    winston.format.simple()
  ),
  transports: [
    new winston.transports.Console(),
    new winston.transports.File({ filename: 'errors.log', level: 'error' })
  ]
});

const requestLogger = expressWinston.logger({
  transports: [new winston.transports.Console()],
  format: winston.format.combine(
    winston.format.colorize(),
    winston.format.simple()
  ),
  meta: false,
  msg: 'HTTP {{req.method}} {{req.url}}',
  expressFormat: true,
  colorize: true,
  ignoreRoute: function (req, res) { return false; }
});


app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cors());
app.use(session({ secret: 'your-secret-key', resave: false, saveUninitialized: true }));
app.use(passport.initialize());
app.use(passport.session());


const productsRouter = require('./routes/productsRouter');
const cartsRouter = require('./routes/cartsRouter');
const sessionsRouter = require('./routes/sessionsRouter');
const usersRouter = require('./routes/usersRouter');


app.use(requestLogger);

// Rutas
app.use('/api/products', productsRouter);
app.use('/api/carts', cartsRouter);
app.use('/api/sessions', sessionsRouter);
app.use('/api/users', usersRouter); 


mongoose.connect('mongodb://localhost/tu-base-de-datos', { useNewUrlParser: true, useUnifiedTopology: true });
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'Error de conexión a la base de datos'));
db.once('open', function() {
  console.log('Conexión exitosa a la base de datos');
});



const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Servidor en ejecución en el puerto ${PORT}`);
});


app.use((err, req, res, next) => {
  logger.error(err.stack);
  res.status(500).json({ error: 'Error interno del servidor' });
});


app.use((req, res) => {
  res.status(404).json({ error: 'Ruta no encontrada' });
});
