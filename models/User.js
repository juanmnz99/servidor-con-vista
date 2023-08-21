/*const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  },
  role: {
    type: String,
    enum: ['admin', 'user'],
    default: 'user'
  }
});

const User = mongoose.model('User', userSchema);

module.exports = User;
const bcrypt = require('bcrypt');

userSchema.pre('save', function(next) {
  if (!this.isModified('password')) {
    return next();
  }

  bcrypt.genSalt(10, (err, salt) => {
    if (err) return next(err);

    bcrypt.hash(this.password, salt, (err, hash) => {
      if (err) return next(err);

      this.password = hash;
      next();
    });
  });
});*/const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  // ... other fields
  role: { type: String, enum: ['user', 'admin', 'premium'], default: 'user' },
});

module.exports = mongoose.model('User', userSchema);

const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const express = require('express');
const router = express.Router();
const usersController = require('../controllers/usersController');

/**
 * @swagger
 * /api/users/premium/{uid}:
 *   put:
 *     summary: Cambiar el rol de un usuario a "premium" o "user"
 *     parameters:
 *       - in: path
 *         name: uid
 *         required: true
 *         schema:
 *           type: string
 *       - in: query
 *         name: role
 *         required: true
 *         schema:
 *           type: string
 *           enum: [premium, user]
 *     responses:
 *       200:
 *         description: Usuario actualizado exitosamente
 *       404:
 *         description: Usuario no encontrado
 *       500:
 *         description: Error en el servidor
 */
router.put('/api/users/premium/:uid', usersController.updateUserRole);

module.exports = router;
