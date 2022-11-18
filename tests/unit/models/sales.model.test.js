const { expect } = require('chai');
const sinon = require('sinon');

const salesModel = require('../../../src/models/sales.model');
const connection = require('../../../src/models/db/connection');

const { saleProducts } = require('./mocks/sales.model.mock');

describe('Testa sales model', function () {
  it('Testa se a função insertSale retorna o id da venda.', async function () {
    sinon.stub(connection, 'execute').resolves([{ insertId: 1 }]);

    const result = await salesModel.insertSale();

    expect(result).to.be.equal(1);
  });
});
