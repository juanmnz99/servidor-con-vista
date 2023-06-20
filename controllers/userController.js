const User = require('../models/User');

// Obtener información del usuario actual
const getCurrentUser = async (req, res) => {
  try {
    const { user } = req;
    if (!user) {
      return res.status(401).json({ message: 'No se encontró un usuario autenticado' });
    }

    res.status(200).json({ user });
  } catch (error) {
    res.status(500).json({ message: 'Error al obtener el usuario actual' });
  }
};

module.exports = {
  getCurrentUser
};
