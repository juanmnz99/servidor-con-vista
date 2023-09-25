

const User = require('../models/User');



exports.uploadDocuments = async (req, res) => {
  try {
    const { uid } = req.params;
    const user = await User.findById(uid);

    if (!user) {
      return res.status(404).json({ error: 'Usuario no encontrado' });
    }

   
    if (!req.file || !req.body.name || !req.body.reference) {
      return res.status(400).json({ error: 'Faltan datos de documentos' });
    }

  
    user.documents.push({
      name: req.body.name,
      reference: req.body.reference,
    });

   
    await user.save();

    return res.status(201).json({ message: 'Documento subido correctamente' });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'Error interno del servidor' });
  }
};


exports.updateToPremium = async (req, res) => {
  try {
    const { uid } = req.params;
    const user = await User.findById(uid);

    if (!user) {
      return res.status(404).json({ error: 'Usuario no encontrado' });
    }


    if (
      user.documents.length < 3 ||
      !user.documents.some((doc) => doc.name === 'Identificación') ||
      !user.documents.some((doc) => doc.name === 'Comprobante de domicilio') ||
      !user.documents.some((doc) => doc.name === 'Comprobante de estado de cuenta')
    ) {
      return res.status(400).json({ error: 'Falta documentación requerida' });
    }

    user.role = 'premium';
    await user.save();

    return res.status(200).json({ message: 'Usuario actualizado a premium' });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'Error interno del servidor' });
  }
};




const getAllUsers = async (req, res) => {
  try {
   
    const users = await User.find({}, 'nombre correo rol');

    
    res.json(users);
  } catch (error) {
    
    console.error(error);
    res.status(500).json({ error: 'Error al obtener los usuarios' });
  }
};

module.exports = {
  getAllUsers,
};



const User = require('../models/User');
const sendInactiveUserEmail = require('../utils/email'); 


const cleanupInactiveUsers = async (req, res) => {
  try {
   
    const cutoffDate = new Date();
    cutoffDate.setDate(cutoffDate.getDate() - 2);

   
    const result = await User.deleteMany({ last_connection: { $lt: cutoffDate } });

    
    const deletedUsers = result.deletedCount;
    if (deletedUsers > 0) {
      
      const deletedUserEmails = await User.find({ last_connection: { $lt: cutoffDate } }, 'correo');

      
      deletedUserEmails.forEach(async (user) => {
        await sendInactiveUserEmail(user.correo);
      });
    }

    res.json({ message: `${deletedUsers} usuarios inactivos eliminados.` });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error al limpiar usuarios inactivos.' });
  }
};

module.exports = {
  cleanupInactiveUsers,
};






const { sendEmail } = require('../email');
const User = require('../models/User'); 


exports.deleteInactiveUsers = async (req, res) => {
  try {
    const inactiveUsers = await User.find({
      last_connection: {
        $lt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000), 
      },
    });

    inactiveUsers.forEach(async (user) => {
      const userEmail = user.email; 
      const emailSubject = 'Eliminación de cuenta';
      const emailText = 'Tu cuenta ha sido eliminada debido a inactividad.';

      await sendEmail(userEmail, emailSubject, emailText);

     
      await User.findByIdAndRemove(user._id);
    });

    res.status(200).json({ message: 'Usuarios inactivos eliminados con éxito' });
  } catch (error) {
    console.error('Error al eliminar usuarios inactivos:', error);
    res.status(500).json({ error: 'Error interno del servidor' });
  }
};const User = require('../models/User');


exports.viewUsers = async (req, res) => {
  try {
    const users = await User.find();
    res.render('admin/users', { users });
  } catch (error) {
    console.error(error);
    res.status(500).send('Error al obtener la lista de usuarios');
  }
};


exports.updateUserRole = async (req, res) => {
  const { userId } = req.params;
  const { newRole } = req.body;

  try {
    const user = await User.findById(userId);
    user.role = newRole;
    await user.save();
    res.redirect('/admin/users');
  } catch (error) {
    console.error(error);
    res.status(500).send('Error al modificar el rol del usuario');
  }
};


exports.deleteUser = async (req, res) => {
  const { userId } = req.params;

  try {
    await User.findByIdAndRemove(userId);
    res.redirect('/admin/users');
  } catch (error) {
    console.error(error);
    res.status(500).send('Error al eliminar el usuario');
  }
};

