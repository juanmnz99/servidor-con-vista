
const User = require('../models/user');



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
