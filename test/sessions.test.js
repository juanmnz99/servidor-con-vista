const request = require('supertest');
const app = require('../src/app'); 

const expect = require('chai').expect;

describe('Products API', () => {
  it('should get all products', async () => {
    const response = await request(app).get('/api/products/');
    expect(response.status).to.equal(200);
    expect(response.body).to.be.an('array');
  });

  it('should get a specific product by ID', async () => {
    const response = await request(app).get('/api/products/1');
    expect(response.status).to.equal(200);
    expect(response.body).to.be.an('object');
    expect(response.body.id).to.equal(1);
  });

  it('should create a new product', async () => {
    const newProduct = {
      title: 'New Product',
     
    };
    const response = await request(app)
      .post('/api/products/')
      .send(newProduct);
    expect(response.status).to.equal(201);
    expect(response.body.title).to.equal(newProduct.title);
  });
  
});
