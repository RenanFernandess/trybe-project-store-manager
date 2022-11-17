const { expect } = require('chai');
const sinon = require('sinon');

const connection = require('../../../src/models/db/connection');
const productsModel = require('../../../src/models/products.model');

const { products, newProduct } = require('./mocks/products.model.mock');

describe('Testando products model', function() {
  it('Testa se função getAll tem o retorno esperado.', async function () {
    sinon.stub(connection, 'execute').resolves([products]);

    const result = await productsModel.getAll();

    expect(result).to.be.equal(products);
  });

  it('Testa se for passado um id valido para a função getById tem o retorno esperado.', async function () {
    const [product] = products;
    sinon.stub(connection, 'execute').resolves([[product]]);

    const productId = 1
    const result = await productsModel.getById(productId);

    expect(result).to.be.deep.equal([product]);
  });

  it('Testa se é possivel adicionar um novo produto com a função insert.', async function () {
    const { id, name } = newProduct;
    sinon.stub(connection, 'execute')
      .onFirstCall()
      .resolves([[{ insertId: id }]])
      .onSecondCall()
      .resolves([[newProduct]]);

    const result = await productsModel.insert({ name });

    expect(result).to.be.deep.equal(newProduct);
  });

  afterEach(sinon.restore);
});
