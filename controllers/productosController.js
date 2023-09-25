
const ProductoRepository = require('../repositories/productoRepository');

class ProductosController {
  constructor(daoType) {
    this.productoRepository = new ProductoRepository(daoType);
  }

  async obtenerProductos(req, res) {
    try {
      const productos = await this.productoRepository.obtenerProductos();
      res.json(productos);
    } catch (error) {
      res.status(500).json({ error: 'Error al obtener los productos' });
    }
  }

  
}

module.exports = ProductosController;




const Producto = require('../models/producto'); 
const transporter = require('../config/nodemailer'); 

async function eliminarProducto(req, res) {
  const productId = req.params.productId;

  try {
  
    const producto = await Producto.findById(productId);

    if (!producto) {
      return res.status(404).json({ message: 'Producto no encontrado' });
    }

    
    const esUsuarioPremium = producto.owner.tipoCuenta === 'premium';

    if (esUsuarioPremium) {
     
      const mailOptions = {
        from: 'tuCorreo@gmail.com',
        to: producto.owner.correo, 
        subject: 'Notificación: Producto Eliminado',
        text: `Tu producto "${producto.nombre}" ha sido eliminado por razones específicas.`,
      };

      await transporter.sendMail(mailOptions);
    }

    
    await Producto.findByIdAndRemove(productId);

    return res.status(200).json({ message: 'Producto eliminado exitosamente' });
  } catch (error) {
    console.error('Error al eliminar producto:', error);
    return res.status(500).json({ message: 'Error interno del servidor' });
  }
}

module.exports = { eliminarProducto };



const Producto = require('../models/producto');


exports.listaProductos = (req, res) => {
    
    Producto.find({}, (err, productos) => {
        if (err) {
            console.error('Error al obtener la lista de productos:', err);
            
        } else {
            
            res.render('lista', { productos: productos });
        }
    });
};

function listaProductos(req, res) {
  
  const productos = obtenerProductosDesdeBD();

  res.render('productos/lista', { productos });
}
