const { expect } = require('chai');
const sinon = require('sinon');

const { products, newProduct } = require('./mocks/products.service.mock');
const productsService = require('../../../src/services/products.service');
const productsModel = require('../../../src/models/products.model');

const ERROR_MESSAGE = 'Product not found';
const CODE_ERROR = 404;

describe('Testando products service', function () {
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

  it('Testa se caso o campo name não tiver no mínimo 5 caracteres um erro é retornado.', async function () {
    const { type, message } = await productsService.addProduct({ name: 'aui' });

    expect(type).to.be.equal(422);
    expect(message).to.be.equal('"name" length must be at least 5 characters long');
  });

  it('Verifica se a função addProduct retorna um objeto com chave type equal a null e chave message com produto adicionado como valor.', async function () {
    sinon.stub(productsModel, 'insert').resolves(newProduct);

    const { name } = newProduct;
    const { type, message } = await productsService.addProduct({ name });

    expect(type).to.be.equal(null);
    expect(message).to.be.deep.equal(newProduct);
  });

  it('Verifica se a função updateProduct retorna um objeto com chave type com valor 400 e chave message com valor ""name" is required" caso o nome não seja passado.', async function () {
    const { type, message } = await productsService.updateProduct(1, {});

    expect(type).to.be.equal(400);
    expect(message).to.be.deep.equal('"name" is required');
  });

  it('Verifica se a função updateProduct retorna um objeto com chave type com valor 422 e chave message com valor ""name" length must be at least 5 characters long" caso o nome não tenha mais de 5 caracteres.', async function () {
    const { type, message } = await productsService.updateProduct(1, { name: 'len'});

    expect(type).to.be.equal(422);
    expect(message).to.be.deep.equal('"name" length must be at least 5 characters long');
  });

  it('Verifica se a função updateProduct retorna um objeto com chave type com valor 404 e chave message com valor "Product not found" caso o id recebido não pertença a algum produto.', async function () {
    sinon.stub(productsModel, 'getById').resolves([]);

    const { type, message } = await productsService.updateProduct(1, { name: 'nameOk' });

    expect(type).to.be.equal(404);
    expect(message).to.be.deep.equal('Product not found');
  });

  it('Verifica se a função updateProduct retorna um objeto com chave type com valor null e chave message com valor .', async function () {
    sinon.stub(productsModel, 'getById').resolves([{}]);
    sinon.stub(productsModel, 'update').resolves(products[0]);

    const { type, message } = await productsService.updateProduct(1, { name: 'nameOk' });

    expect(type).to.be.equal(null);
    expect(message).to.be.deep.equal(products[0]);
  });

  it('Verifica se a função deleteProduct retorna um objeto com chave type com valor 404 e chave message com valor "Product not found" caso o id recebido não pertença a algum produto.', async function () {
    sinon.stub(productsModel, 'getById').resolves([]);

    const { type, message } = await productsService.deleteProduct(1);

    expect(type).to.be.equal(404);
    expect(message).to.be.deep.equal('Product not found');
  });

  it('Verifica se a função deleteProduct retorna um objeto com chave type com valor null e chave message com valor .', async function () {
    sinon.stub(productsModel, 'getById').resolves([{}]);
    sinon.stub(productsModel, 'remove').resolves();

    const { type, message } = await productsService.deleteProduct(1);

    expect(type).to.be.equal(null);
    expect(message).to.be.deep.equal('');
  });

  afterEach(sinon.restore);
});
