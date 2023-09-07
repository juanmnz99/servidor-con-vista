const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({

  documents: [
    {
      name: String,
      reference: String,
    },
  ],
  last_connection: Date,
});

module.exports = mongoose.model('User', userSchema);
const multer = require('multer');


const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    
    if (file.fieldname === 'profileImage') {
      cb(null, 'uploads/profiles');
    } else if (file.fieldname === 'productImage') {
      cb(null, 'uploads/products');
    } else if (file.fieldname === 'document') {
      cb(null, 'uploads/documents');
    } else {
      cb(new Error('Tipo de archivo no válido'), false);
    }
  },
  filename: (req, file, cb) => {
    
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
    const fileExtension = file.originalname.split('.').pop();
    cb(null, file.fieldname + '-' + uniqueSuffix + '.' + fileExtension);
  },
});

const upload = multer({ storage });


router.post('/:uid/documents', upload.single('document'), usersController.uploadDocuments);
