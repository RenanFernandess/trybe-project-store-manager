const { expect } = require('chai');
const sinon = require('sinon');

const salesModel = require('../../../src/models/sales.model');
const salesService = require('../../../src/services/sales.service');
const { saleProducts, addSaleReturn } = require('./mocks/sales.service.mock');

describe('Testa sales service', function () {
  it('Testa se a função addSale retorna os detalher da venda.', async function () {
    sinon.stub(salesModel, 'insertSale').resolves(1);
    sinon.stub(salesModel, 'insertSaleProducts').resolves(undefined);
    sinon.stub(salesModel, 'getSaleDetails').resolves(saleProducts);

    const result = await salesService.addSale(saleProducts);

    expect(result).to.be.deep.equal(addSaleReturn);
  })

  afterEach(sinon.restore);
});
