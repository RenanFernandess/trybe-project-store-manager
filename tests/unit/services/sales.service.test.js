const { expect } = require('chai');
const sinon = require('sinon');

const salesModel = require('../../../src/models/sales.model');
const salesService = require('../../../src/services/sales.service');
const productsModule = require('../../../src/models/products.model');
const { saleProducts, addSaleReturn, quantityIsReq, quantityValueError, porductIdIsReq } = require('./mocks/sales.service.mock');

describe('Testa sales service', function () {
  it('Testa se a função addSale retorna os detalher da venda.', async function () {
    sinon.stub(salesModel, 'insertSale').resolves(1);
    sinon.stub(salesModel, 'insertSaleProducts').resolves(undefined);
    sinon.stub(salesModel, 'getSaleDetails').resolves(saleProducts);

    const result = await salesService.addSale(saleProducts);

    expect(result).to.be.deep.equal(addSaleReturn);
  });

  it('Testa se a função addSale retorna status code e message de error quando a chave quantity não for encontrada.', async function () {
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

  it('Testa se a função addSale retorna status code e message de error quando a chave productId não for encontrada.', async function () {
    const mock = [
      {
        "quantity": 1,
      },
      {
        "productId": 2,
        "quantity": 5,
      }
    ];

    const result = await salesService.addSale(mock);

    expect(result.type).to.be.equal(porductIdIsReq.type);
    expect(result.message).to.be.equal(porductIdIsReq.message);
  });

  it('Testa se a função addSale retorna status code e message de error quando o valor a chave quantity for menor ou iqual a 0.', async function () {
    const mock = [
      {
        "productId": 2,
        "quantity": 0,
      },
      {
        "productId": 2,
        "quantity": 5,
      }
    ];

    const result = await salesService.addSale(mock);

    expect(result.type).to.be.equal(quantityValueError.type);
    expect(result.message).to.be.equal(quantityValueError.message);
  });

  afterEach(sinon.restore);
});
