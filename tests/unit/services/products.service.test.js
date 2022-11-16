const { expect } = require('chai');
const sinon = require('sinon');

const { products } = require('./mocks/products.service.mock');
const productsService = require('../../../src/services/products.service');
const productsModel = require('../../../src/models/products.model');

const ERROR_MESSAGE = 'Product not found';
const CODE_ERROR = 404;

describe('Testando products serveci', function () {
  it('Verifica se a função getProducts retorna um objeto com a chave type equal a null e chave message com os produtos.', async function () {
    sinon.stub(productsModel, 'getAll').resolves(products);

    const { type, message } = await productsService.getProducts();

    expect(type).to.be.equal(null);
    expect(message).to.be.equal(products);
  });

  it('Verifica se não for encontrado produtos no banco de dados a função getProducts retorna uma mensagem de error.', async function () {
    sinon.stub(productsModel, 'getAll').resolves([]);

    const { type, message } = await productsService.getProducts();

    expect(type).to.be.equal(CODE_ERROR);
    expect(message).to.be.equal(ERROR_MESSAGE);
  });

  it('Verifica se a função getProductById retorna um objeto com chave type equal a null e chave message com produto como valor', async function () {
    sinon.stub(productsModel, 'getById').resolves([products[0]]);

    const { type, message } = await productsService.getProductById(1);

    expect(type).to.be.equal(null);
    expect(message).to.be.deep.equal([products[0]]);
  });

  afterEach(sinon.restore);
});
