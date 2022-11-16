const { expect } = require('chai');
const sinon = require('sinon');

const { products } = require('./mocks/products.service.mock');
const productsService = require('../../../src/services/products.service');
const productsModel = require('../../../src/models/products.model');

describe('Testando products serveci', function () {
  it('Verifica se a função getProducts retorna um objeto com a chave type equal a null e chave message com os produtos', async function () {
    sinon.stub(productsModel, 'getAll').resolves(products);

    const { type, message } = await productsService.getProducts();

    expect(type).to.be.equal(null);
    expect(message).to.be.equal(products);
  });

  afterEach(sinon.restore);
});
