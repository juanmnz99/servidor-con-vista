const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');


router.get('/admin/users', userController.viewUsers);


router.post('/admin/users/:userId/update-role', userController.updateUserRole);

router.delete('/admin/users/:userId', userController.deleteUser);

module.exports = router;



const express = require('express');
const userController = require('../controllers/userController');
const passport = require('../passport-config'); 


function ensureAuthenticated(req, res, next) {
  if (req.isAuthenticated() && req.user.isAdmin) {
    return next();
  }
  res.redirect('/login'); 
}

router.get('/admin/users', ensureAuthenticated, userController.viewUsers);


router.post('/admin/users/:userId/update-role', ensureAuthenticated, userController.updateUserRole);
router.delete('/admin/users/:userId', ensureAuthenticated, userController.deleteUser);

module.exports = router;
