/*const express = require('express');
const router = express.Router();


router.post('/register', (req, res) => {
  
  res.redirect('/products');
});


router.post('/login', (req, res) => {

  res.redirect('/products');
});

module.exports = router;
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const GitHubStrategy = require('passport-github').Strategy;
const bcrypt = require('bcrypt');
const User = require('../models/User');

passport.use(new LocalStrategy(async (username, password, done) => {
  try {
    const user = await User.findOne({ username });

    if (!user) {
      return done(null, false, { message: 'Usuario no encontrado' });
    }

    const match = await bcrypt.compare(password, user.password);

    if (!match) {
      return done(null, false, { message: 'Contraseña incorrecta' });
    }

    return done(null, user);
  } catch (error) {
    return done(error);
  }
}));


passport.use(new GitHubStrategy({
  clientID: GITHUB_CLIENT_ID,
  clientSecret: GITHUB_CLIENT_SECRET,
  callbackURL: 'http://localhost:8080/auth/github/callback'
}, async (accessToken, refreshToken, profile, done) => {
  try {
    
    let user = await User.findOne({ githubId: profile.id });

    if (user) {
      return done(null, user);
    }

    user = new User({
      username: profile.username,
      githubId: profile.id
    });

    await user.save();

    return done(null, user);
  } catch (error) {
    return done(error);
  }
}));

passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser(async (id, done) => {
  try {
    const user = await User.findById(id);
    done(null, user);
  } catch (error) {
    done(error);
  }
});

router.post('/login', passport.authenticate('local', {
  successRedirect: '/products',
  failureRedirect: '/login',
  failureFlash: true
}));

router.get('/github', passport.authenticate('github'));

router.get('/github/callback', passport.authenticate('github', {
  successRedirect: '/products',
  failureRedirect: '/login'
}));*/
const express = require('express');
const router = express.Router();
const passport = require('passport');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const User = require('../models/user');


router.post('/register', async (req, res, next) => {
  try {
    const { first_name, last_name, email, password } = req.body;
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ error: 'Email already exists' });
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new User({
      first_name,
      last_name,
      email,
      password: hashedPassword
    });
    await newUser.save();
    res.json({ message: 'User registered successfully' });
  } catch (error) {
    next(error);
  }
});

router.post('/login', (req, res, next) => {
  passport.authenticate('local', { session: false }, (err, user, info) => {
    if (err) {
      return next(err);
    }
    if (!user) {
      return res.status(401).json({ error: info.message });
    }
    req.login(user, { session: false }, async (err) => {
      if (err) {
        return next(err);
      }
      const token = jwt.sign({ id: user._id }, 'your_secret_key');
      return res.json({ token });
    });
  })(req, res, next);
});

module.exports = router;
