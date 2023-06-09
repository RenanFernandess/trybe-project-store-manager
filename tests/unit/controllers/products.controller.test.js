const chai = require('chai');
const sinon = require('sinon');
const sinonChai = require('sinon-chai');

const { expect } = chai;
chai.use(sinonChai);

const productsService = require('../../../src/services/products.service');
const productsController = require('../../../src/controllers/products.controller');
const {
  products,
  newProduct,
  addProductOk,
  getProductsOk,
  getProductByIdOk,
  nothingFoundError,
  addProductError,
} = require('./mocks/products.controller.mock')

const STATUS_CODE_OK = 200;
const STATUS_CODE_ERROR = 404;
const { message } = nothingFoundError;

describe('Testando products controller', function () {
  it('Testa se a função getProducts retorna o status code 200 e os produtos.', async function () {
    const req = {};
    const res = {};

    res.status = sinon.stub().returns(res);
    res.json = sinon.stub().returns();
    sinon.stub(productsService, 'getProducts').resolves(getProductsOk);

    await productsController.getProducts(req, res);

    expect(res.status).to.have.been.calledWith(STATUS_CODE_OK);
    expect(res.json).to.have.been.calledWith(products);
  });

  it('Testa se a função getProducts retorna o status code e uma mensagem de erro casso ocorra algum problema.', async function () {
    const req = {}
    const res = {}

    res.status = sinon.stub().returns(res);
    res.json = sinon.stub().returns();
    sinon.stub(productsService, 'getProducts').resolves(nothingFoundError);

    await productsController.getProducts(req, res);

    expect(res.status).to.have.been.calledWith(STATUS_CODE_ERROR);
    expect(res.json).to.have.been.calledWith({ message });
  });

  it('Testa se a função getProductById retorna o status code 200 e o produtos referente ao id.', async function () {
    const req = { params: { id: 1 } };
    const res = {};

    res.status = sinon.stub().returns(res);
    res.json = sinon.stub().returns();
    sinon.stub(productsService, 'getProductById').resolves(getProductByIdOk);

    await productsController.getProductById(req, res);

    expect(res.status).to.have.been.calledWith(STATUS_CODE_OK);
    expect(res.json).to.have.been.calledWith({ ...products[0] });
  });

  it('Testa se a função getProductById retorna o status code e uma mensagem de erro casso ocorra algum problema.', async function () {
    const req = { params: { id: 1 } };
    const res = {};

    res.status = sinon.stub().returns(res);
    res.json = sinon.stub().returns();
    sinon.stub(productsService, 'getProductById').resolves(nothingFoundError);

    await productsController.getProductById(req, res);

    expect(res.status).to.have.been.calledWith(STATUS_CODE_ERROR);
    expect(res.json).to.have.been.calledWith({ message });
  });

  it('Testa se a função addProduct retorna o status code 201 e o produto adicionado.', async function () {
    const { name } = newProduct;
    const req = { body: { name } };
    const res = {};

    res.status = sinon.stub().returns(res);
    res.json = sinon.stub().returns();
    sinon.stub(productsService, 'addProduct').resolves(addProductOk);

    await productsController.addProduct(req, res);

    expect(res.status).to.have.been.calledWith(201);
    expect(res.json).to.have.been.calledWith(newProduct);
  });

  it('Testa se a função addProduct retorna algum code de error caso algo de errado.', async function () {
    const req = { body: { name: 'aui' } };
    const res = {};

    res.status = sinon.stub().returns(res);
    res.json = sinon.stub().returns();
    sinon.stub(productsService, 'addProduct').resolves(addProductError);

    const { type, message } = addProductError;

    await productsController.addProduct(req, res);

    expect(res.status).to.have.been.calledWith(type);
    expect(res.json).to.have.been.calledWith({ message });
  });

  it('Testa se a função updateProduct retorna o status code 200 e o produtos atualizado.', async function () {
    const req = { params: { id: 1 } };
    const res = {};

    res.status = sinon.stub().returns(res);
    res.json = sinon.stub().returns();
    sinon.stub(productsService, 'updateProduct').resolves(getProductByIdOk);

    await productsController.updateProduct(req, res);

    expect(res.status).to.have.been.calledWith(STATUS_CODE_OK);
    expect(res.json).to.have.been.calledWith([products[0]]);
  });

  it('Testa se a função updateProduct retorna o status code e uma mensagem de erro casso ocorra algum problema.', async function () {
    const req = { params: { id: 1 } }
    const res = {}

    res.status = sinon.stub().returns(res);
    res.json = sinon.stub().returns();
    sinon.stub(productsService, 'updateProduct').resolves(nothingFoundError);

    await productsController.updateProduct(req, res);

    expect(res.status).to.have.been.calledWith(STATUS_CODE_ERROR);
    expect(res.json).to.have.been.calledWith({ message });
  });

  it('Testa se a função deleteProduct retorna o status code 204 e o produtos atualizado.', async function () {
    const req = { params: { id: 1 } };
    const res = {};

    res.status = sinon.stub().returns(res);
    res.json = sinon.stub().returns();
    sinon.stub(productsService, 'deleteProduct').resolves(getProductByIdOk);

    await productsController.deleteProduct(req, res);

    expect(res.status).to.have.been.calledWith(204);
    expect(res.json).to.have.been.calledWith({});
  });

  it('Testa se a função deleteProduct retorna o status code e uma mensagem de erro casso ocorra algum problema.', async function () {
    const req = { params: { id: 1 } }
    const res = {}

    res.status = sinon.stub().returns(res);
    res.json = sinon.stub().returns();
    sinon.stub(productsService, 'deleteProduct').resolves(nothingFoundError);

    await productsController.deleteProduct(req, res);

    expect(res.status).to.have.been.calledWith(STATUS_CODE_ERROR);
    expect(res.json).to.have.been.calledWith({ message });
  });

  afterEach(sinon.restore);
});
