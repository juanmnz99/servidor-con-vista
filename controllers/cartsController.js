

const Ticket = require('../models/Ticket'); 
const Cart = require('../models/Cart');
const Producto = require('../models/Producto');




class CartsController {
  async finalizarCompra(req, res, next) {
    try {
      const cartId = req.params.cid;
      const cart = await Cart.findById(cartId).populate('products.product');

      if (!cart) {
        return res.status(404).json({ error: 'Carrito no encontrado' });
      }

      const productsNotAvailable = [];

      for (const item of cart.products) {
        const product = item.product;
        if (product.stock >= item.quantity) {
          product.stock -= item.quantity;
          await product.save();
        } else {
          productsNotAvailable.push(product._id);
        }
      }

      if (productsNotAvailable.length > 0) {
      
        cart.products = cart.products.filter((item) =>
          !productsNotAvailable.includes(item.product._id)
        );
      } else {
      
        const ticketCode = 'TICKET-' + Math.random().toString(36).substr(2, 6).toUpperCase();
        const ticketAmount = cart.products.reduce((total, item) => total + item.quantity * item.product.price, 0);
        const ticketPurchaser = cart.user;

        const ticket = new Ticket({
          code: ticketCode,
          amount: ticketAmount,
          purchaser: ticketPurchaser,
        });

        await ticket.save();
      }


      await cart.save();

     
      if (productsNotAvailable.length > 0) {
        return res.status(400).json({ error: 'Algunos productos no estaban disponibles', productsNotAvailable });
      }

     
      res.json({ message: 'Compra finalizada con éxito' });
    } catch (error) {
      next(error);
    }
  }


}

module.exports = CartsController;
