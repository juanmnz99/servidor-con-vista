
const MongooseDAO = require('./mongooseDAO'); 
const OtherDAO = require('./otherDAO'); 

class DAOFactory {
  static getDAO(daoType) {
    switch (daoType) {
      case 'mongoose':
        return new MongooseDAO();
      
      default:
        throw new Error('Invalid DAO type');
    }
  }
}

module.exports = DAOFactory;

