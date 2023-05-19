const { expect } = require('chai');
const sinon = require('sinon');

const salesModel = require('../../../src/models/sales.model');
const connection = require('../../../src/models/db/connection');

const { saleProducts, sale, sales } = require('./mocks/sales.model.mock');

describe('Testa sales model', function () {
  it('Testa se a função insertSale retorna o id da venda.', async function () {
    sinon.stub(connection, 'execute').resolves([{ insertId: 1 }]);

    const result = await salesModel.insertSale();

    expect(result).to.be.equal(1);
  });

  it('Testa se a função insertSaleProducts funciona corretamente.', async function () {
    sinon.stub(connection, 'execute').resolves([{ insertId: 1 }]);

    const saleId = 1
    const result = await salesModel.insertSaleProducts(saleId, { productId: 1, quantity: 1 });

    expect(result).to.be.equal(undefined);
  });

  it('Testa se a função getSaleDetails retorna os detalhes da venda produto e quantidade.', async function () {
    sinon.stub(connection, 'execute').resolves([saleProducts]);

    const saleId = 1
    const result = await salesModel.getSaleDetails(saleId);

    expect(result).to.be.deep.equal(saleProducts);
  });

  it('Testa se função getAll tem o retorno esperado.', async function () {
    sinon.stub(connection, 'execute').resolves([sales]);

    const result = await salesModel.getAll();

    expect(result).to.be.equal(sales);
  });

  it('Testa se for passado um id valido para a função findById tem o retorno esperado.', async function () {
    sinon.stub(connection, 'execute').resolves([[sale]]);

    const saleId = 1
    const result = await salesModel.findById(saleId);

    expect(result).to.be.deep.equal([sale]);
  });

  afterEach(sinon.restore);
});
