const chai = require('chai');
const sinon = require('sinon');
const sinonChai = require('sinon-chai');

const { expect } = chai;
chai.use(sinonChai);

const salesService = require('../../../src/services/sales.service');
const salesController = require('../../../src/controllers/sales.controller');
const {
  addSaleReturn, productIdIsReq, saleProducts, saleProductsError, sales, sale } = require('./mocks/sales.controller.mock');

describe('Testa sales controller', async function () {
  it('Testa se a função addSale retorna status code 201 e os dados da venda.', async function () {
    const req = { body: saleProducts };
    const res = {};

    res.status = sinon.stub().returns(res);
    res.json = sinon.stub().returns();
    sinon.stub(salesService, 'addSale').resolves(addSaleReturn);

    const result = await salesController.addSale(req, res);

    expect(res.status).to.have.been.calledWith(201);
    expect(res.json).to.have.been.calledWith(addSaleReturn.message);
  });

  it('Testa se a função addSale retorna mensagem de error e status code.', async function () {
    const req = { body: saleProductsError };
    const res = {};

    res.status = sinon.stub().returns(res);
    res.json = sinon.stub().returns();

    const result = await salesController.addSale(req, res);

    expect(res.status).to.have.been.calledWith(productIdIsReq.type);
    expect(res.json).to.have.been.calledWith({ message: productIdIsReq.message });
  });

  it('Testa se a função getSales retorna o status code 200 e as vendas.', async function () {
    const req = { params: { id: 1 } };
    const res = {};

    res.status = sinon.stub().returns(res);
    res.json = sinon.stub().returns();
    sinon.stub(salesService, 'getSales').resolves({ type: null, message: sales });

    await salesController.getSales(req, res);

    expect(res.status).to.have.been.calledWith(200);
    expect(res.json).to.have.been.calledWith(sales);
  });

  it('Testa se a função getSales retorna o status code e uma mensagem de erro casso ocorra algum problema.', async function () {
    const req = { params: { id: 1 } }
    const res = {}

    res.status = sinon.stub().returns(res);
    res.json = sinon.stub().returns();
    sinon.stub(salesService, 'getSales').resolves({ type: 404, message: 'Sale not found' });

    await salesController.getSales(req, res);

    expect(res.status).to.have.been.calledWith(404);
    expect(res.json).to.have.been.calledWith({ message: 'Sale not found' });
  });

  it('Testa se a função getSaleById retorna o status code 200 e as vendas.', async function () {
    const req = { params: { id: 1 } };
    const res = {};

    res.status = sinon.stub().returns(res);
    res.json = sinon.stub().returns();
    sinon.stub(salesService, 'getSaleById').resolves({ type: null, message: sale });

    await salesController.getSaleById(req, res);

    expect(res.status).to.have.been.calledWith(200);
    expect(res.json).to.have.been.calledWith(sale);
  });

  it('Testa se a função getSaleById retorna o status code e uma mensagem de erro casso ocorra algum problema.', async function () {
    const req = { params: { id: 1 } }
    const res = {}

    res.status = sinon.stub().returns(res);
    res.json = sinon.stub().returns();
    sinon.stub(salesService, 'getSaleById').resolves({ type: 404, message: 'Sale not found' });

    await salesController.getSaleById(req, res);

    expect(res.status).to.have.been.calledWith(404);
    expect(res.json).to.have.been.calledWith({ message: 'Sale not found' });
  });

  it('Testa se a função updateSale retorna o status code 200 e o produtos atualizado.', async function () {
    const req = {
      params: { id: 1 },
      body: [
        {
        "productId": 1,
        "quantity": 10
        },
      ],
    };
    const res = {};

    res.status = sinon.stub().returns(res);
    res.json = sinon.stub().returns();

    const result = {
      "saleId": 1,
      "itemsUpdated": [
        {
          "productId": 1,
          "quantity": 10
        },
      ],
    };

    sinon.stub(salesService, 'updateSale').resolves({ type: null, message: result });

    await salesController.updateSale(req, res);

    expect(res.status).to.have.been.calledWith(200);
    expect(res.json).to.have.been.calledWith(result);
  });

  it('Testa se a função updateSale retorna o status code e uma mensagem de erro casso ocorra algum problema.', async function () {
    const req = { params: { id: 1 } }
    const res = {}

    res.status = sinon.stub().returns(res);
    res.json = sinon.stub().returns();
    sinon.stub(salesService, 'updateSale').resolves({ type: 404, message: 'Sale not found' });

    await salesController.updateSale(req, res);

    expect(res.status).to.have.been.calledWith(404);
    expect(res.json).to.have.been.calledWith({ message: 'Sale not found' });
  });

  it('Testa se a função deleteSale retorna o status code 204 e o produtos atualizado.', async function () {
    const req = { params: { id: 1 } };
    const res = {};

    res.status = sinon.stub().returns(res);
    res.json = sinon.stub().returns();
    sinon.stub(salesService, 'deleteSale').resolves({ type: null, message: ''});

    await salesController.deleteSale(req, res);

    expect(res.status).to.have.been.calledWith(204);
    expect(res.json).to.have.been.calledWith({});
  });

  it('Testa se a função deleteSale retorna o status code e uma mensagem de erro casso ocorra algum problema.', async function () {
    const req = { params: { id: 1 } }
    const res = {}

    res.status = sinon.stub().returns(res);
    res.json = sinon.stub().returns();
    sinon.stub(salesService, 'deleteSale').resolves({ type: 404, message: 'Sale not found' });

    await salesController.deleteSale(req, res);

    expect(res.status).to.have.been.calledWith(404);
    expect(res.json).to.have.been.calledWith({ message: 'Sale not found' });
  });

  afterEach(sinon.restore);
});
