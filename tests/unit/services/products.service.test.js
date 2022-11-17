const { expect } = require('chai');
const sinon = require('sinon');

const { products, newProduct } = require('./mocks/products.service.mock');
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

  it('Verifica se a função getProducts retorna os produtos em ordem crescente.', async function () {
    sinon.stub(productsModel, 'getAll').resolves(products.reverse());

    const { message } = await productsService.getProducts();

    expect(message).to.be.equal(products);
  });

  it('Verifica se não for encontrado produtos no banco de dados a função getProducts retorna uma mensagem de error.', async function () {
    sinon.stub(productsModel, 'getAll').resolves([]);

    const { type, message } = await productsService.getProducts();

    expect(type).to.be.equal(CODE_ERROR);
    expect(message).to.be.equal(ERROR_MESSAGE);
  });

  it('Verifica se a função getProductById retorna um objeto com chave type equal a null e chave message com produto como valor.', async function () {
    sinon.stub(productsModel, 'getById').resolves([products[0]]);

    const { type, message } = await productsService.getProductById(1);

    expect(type).to.be.equal(null);
    expect(message).to.be.deep.equal([products[0]]);
  });

  it('Verifica se não for encontrado produtos no banco de dados a função getProductById retorna uma mensagem de error.', async function () {
    sinon.stub(productsModel, 'getById').resolves([]);

    const { type, message } = await productsService.getProductById(1);

    expect(type).to.be.equal(CODE_ERROR);
    expect(message).to.be.equal(ERROR_MESSAGE);
  });

  it('Testa se caso o campo name não seja passado um erro é retornado.', async function () {
    const { type, message } = await productsService.addProduct({});

    expect(type).to.be.equal(400);
    expect(message).to.be.equal('"name" is required');
  });

  it('Testa se caso o campo name não tiver no minimo 5 caracteres um erro é retornado.', async function () {
    const { type, message } = await productsService.addProduct({ name: 'aui' });

    expect(type).to.be.equal(422);
    expect(message).to.be.equal('"name" length must be at least 5 characters long');
  });

  afterEach(sinon.restore);
});
