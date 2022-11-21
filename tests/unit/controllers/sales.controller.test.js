const chai = require('chai');
const sinon = require('sinon');
const sinonChai = require('sinon-chai');

const { expect } = chai;
chai.use(sinonChai);

const salesService = require('../../../src/services/sales.service');
const salesController = require('../../../src/controllers/sales.controller');
const { addSaleReturn, porductIdIsReq, saleProducts } = require('./mocks/sales.controller.mock');

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

  afterEach(sinon.restore);
});
