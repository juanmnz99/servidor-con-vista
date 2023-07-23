
const DAOFactory = require('../factories/daoFactory');

class ProductoRepository {
  constructor(daoType) {
    this.dao = DAOFactory.getDAO(daoType);
  }

  async obtenerProductos() {
    return await this.dao.obtenerProductos();
  }



}

module.exports = ProductoRepository;
