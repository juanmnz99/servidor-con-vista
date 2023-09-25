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








const usersRouter = require('./routes/usersRouter');
app.use('/api/users', usersRouter);

const CronJob = require('cron').CronJob;
const nodemailer = require('nodemailer');

const job = new CronJob('0 0 * * *', async function () {
 
});

job.start(); 
const express = require('express');
const session = require('express-session');
const passport = require('passport');





app.use(session({
  secret: 'tu_secreto_aqui',
  resave: false,
  saveUninitialized: false,
}));


app.use(passport.initialize());
app.use(passport.session());



const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
  service: 'Gmail',
  auth: {
    user: 'tuCorreo@gmail.com', 
    pass: 'tuContraseña',      
  },
});

module.exports = transporter;



const express = require('express');
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const JwtStrategy = require('passport-jwt').Strategy;
const User = require('./models/User'); 




passport.use(new LocalStrategy(User.authenticate())); 

const jwtOptions = {
    jwtFromRequest: (req) => req.cookies.jwt, 
    secretOrKey: 'tu_secreto', 
};

passport.use(new JwtStrategy(jwtOptions, (jwtPayload, done) => {
    User.findById(jwtPayload.sub, (err, user) => {
        if (err) {
            return done(err, false);
        }
        if (user) {
            return done(null, user);
        } else {
            return done(null, false);
        }
    });
}));


app.use(passport.initialize());




app.get('/ruta-protegida', passport.authenticate('jwt', { session: false }), (req, res) => {
    
    res.send('Ruta protegida');
});


app.listen(3000, () => {
    console.log('Servidor en ejecución en el puerto 3000');
});






passport.use(new LocalStrategy(User.authenticate()));


passport.use(new JwtStrategy(jwtOptions, (jwtPayload, done) => {
    User.findById(jwtPayload.sub, (err, user) => {
        if (err) {
            return done(err, false);
        }
        if (user) {
            return done(null, user);
        } else {
            return done(null, false);
        }
    });
}));


app.use(cookieParser());


app.use(passport.initialize());




app.get('/ruta-protegida', passport.authenticate('jwt', { session: false }), (req, res) => {
   
    res.send('Ruta protegida');
});


app.listen(3000, () => {
    console.log('Servidor en ejecución en el puerto 3000');
});
