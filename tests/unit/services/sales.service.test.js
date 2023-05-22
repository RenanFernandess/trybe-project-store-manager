const { expect } = require('chai');
const sinon = require('sinon');

const salesModel = require('../../../src/models/sales.model');
const salesService = require('../../../src/services/sales.service');
const productsModule = require('../../../src/models/products.model');
const {
  saleProducts,
  addSaleReturn,
  quantityIsReq,
  quantityValueError,
  productIdIsReq,
  productNotFound,
} = require('./mocks/sales.service.mock');

describe('Testa sales service', function () {
  it('Testa se a função addSale retorna os detalhes da venda.', async function () {
    sinon.stub(productsModule, 'getById').resolves([{}])
    sinon.stub(salesModel, 'insertSale').resolves(1);
    sinon.stub(salesModel, 'insertSaleProducts').resolves(undefined);
    sinon.stub(salesModel, 'getSaleDetails').resolves(saleProducts);

    const result = await salesService.addSale(saleProducts);

    expect(result).to.be.deep.equal(addSaleReturn);
  });

  it('Testa se a função addSale retorna status 400 e message de error ""quantity" is required" quando a chave quantity não for encontrada.', async function () {
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

  it('Testa se a função addSale retorna status 400 e message de error ""productId" is required" quando a chave productId não for encontrada.', async function () {
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

    expect(result.type).to.be.equal(productIdIsReq.type);
    expect(result.message).to.be.equal(productIdIsReq.message);
  });

  it('Testa se a função addSale retorna status 422 e message de error ""quantity" must be greater than or equal to 1" quando o valor a chave quantity for menor ou igual a 0.', async function () {
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

  it('Testa se a função addSale retorna status 404 e message de error "Product not found" quando o productId passado não existir.', async function () {
    sinon.stub(productsModule, 'getById').resolves([])
    const mock = [
      {
        "productId": 1,
        "quantity": 1,
      },
      {
        "productId": 20,
        "quantity": 5,
      }
    ];

    const result = await salesService.addSale(mock);

    expect(result.type).to.be.equal(productNotFound.type);
    expect(result.message).to.be.equal(productNotFound.message);
  });

  it('Testa se a função getSales retorna status 404 e message de error "Sale not found" quando não tiver nenhuma venda cadastrada.', async function () {
    sinon.stub(salesModel, 'getAll').resolves([])

    const result = await salesService.getSales();

    expect(result.type).to.be.equal(404);
    expect(result.message).to.be.equal('Sale not found');
  });

  it('Testa se a função getSales retorna as vendas.', async function () {
    sinon.stub(salesModel, 'getAll').resolves(saleProducts)

    const result = await salesService.getSales();

    expect(result.type).to.be.equal(null);
    expect(result.message).to.be.equal(saleProducts);
  });

  it('Testa se a função getSaleById retorna status 404 e message de error "Sale not found" quando não tiver nenhuma venda cadastrada.', async function () {
    sinon.stub(salesModel, 'findById').resolves([])

    const result = await salesService.getSaleById();

    expect(result.type).to.be.equal(404);
    expect(result.message).to.be.equal('Sale not found');
  });

  it('Testa se a função getSaleById retorna a venda referente ao id.', async function () {
    sinon.stub(salesModel, 'findById').resolves([saleProducts[0]])

    const result = await salesService.getSaleById();

    expect(result.type).to.be.equal(null);
    expect(result.message).to.be.deep.equal([saleProducts[0]]);
  });

  afterEach(sinon.restore);
});
