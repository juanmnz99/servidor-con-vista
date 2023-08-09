
router.get('/current', (req, res, next) => {
  passport.authenticate('current', { session: false }, (err, user, info) => {
    if (err) {
      return next(err);
    }
    if (!user) {
      return res.status(401).json({ error: info.message });
    }
    const userDTO = {
      id: user._id,
      email: user.email,
      role: user.role,
    };
    return res.json(userDTO);
  })(req, res, next);
});
const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');

router.post('/forgot-password', authController.forgotPassword);
router.get('/reset-password/:token', authController.resetPassword);

module.exports = router;
