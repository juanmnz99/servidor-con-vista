const User = require('../models/User');


exports.updateUserRole = async (req, res) => {
  const { uid } = req.params;
  const { role } = req.query;

  try {
    const user = await User.findById(uid);
    
    if (!user) {
      return res.status(404).json({ error: 'Usuario no encontrado' });
    }

    user.role = role;
    await user.save();

    res.status(200).json({ message: 'Rol de usuario actualizado exitosamente' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error en el servidor' });
  }
};
