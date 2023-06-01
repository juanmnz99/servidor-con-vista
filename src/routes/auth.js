const express = require('express');
const router = express.Router();


router.post('/register', (req, res) => {
  
  res.redirect('/products');
});


router.post('/login', (req, res) => {

  res.redirect('/products');
});

module.exports = router;
