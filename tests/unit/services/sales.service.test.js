const { expect } = require('chai');
const sinon = require('sinon');

const salesModel = require('../../../src/models/sales.model');
const salesService = require('../../../src/services/sales.service');
const productsModule = require('../../../src/models/products.model');
const { saleProducts, addSaleReturn, quantityIsReq } = require('./mocks/sales.service.mock');

describe('Testa sales service', function () {
  it('Testa se a função addSale retorna os detalher da venda.', async function () {
    sinon.stub(salesModel, 'insertSale').resolves(1);
    sinon.stub(salesModel, 'insertSaleProducts').resolves(undefined);
    sinon.stub(salesModel, 'getSaleDetails').resolves(saleProducts);

    const result = await salesService.addSale(saleProducts);

    expect(result).to.be.deep.equal(addSaleReturn);
  });

  it('Testa se a função retorna status code e message de error quando a chave quantity não for encontrada.', async function () {
    const mock =[
      {
        "productId": 1,
      },
      {
        "productId": 2,
        "quantity": 5,
      }
    ];

    const result = await salesService.addSale(mock);

    expect(result.type).to.be.equal(quantityIsReq.type);
    expect(result.message).to.be.equal(quantityIsReq.message);
  });

  afterEach(sinon.restore);
});
