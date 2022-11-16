const chai = require('chai');
const sinon = require('sinon');
const sinonChai = require('sinon-chai');

const { expect } = chai;
chai.use(sinonChai);

const productsService = require('../../../src/services/products.service');
const productsController = require('../../../src/services/products.service');
const {
  getProductsOk,
  getProductByIdOk,
  nothingFoundError,
} = require('./mocks/products.controller.mock')

describe('Testando products controller', function () {
  it('', async function () {

  });

  afterEach(sinon.restore);
});
