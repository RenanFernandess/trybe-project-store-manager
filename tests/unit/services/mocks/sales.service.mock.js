const saleProducts = [
  {
    "productId": 1,
    "quantity": 1
  },
  {
    "productId": 2,
    "quantity": 5
  }
];

const addSaleReturn = {
  type: null,
  message: {
    id: 1,
    itemsSold: saleProducts,
  },
};

const updateSaleReturn = {
  "saleId": 1,
  "itemsUpdated": saleProducts,
}

const productIdIsReq = { type: 400, message: '"productId" is required' };
const quantityIsReq = { type: 400, message: '"quantity" is required' };
const quantityValueError = {
  type: 422, message: '"quantity" must be greater than or equal to 1',
};
const productNotFound = { type: 404, message: 'Product not found' }

const saleNotFound = { type: 404, message: 'Sale not found' }

module.exports = {
  saleProducts,
  addSaleReturn,
  productIdIsReq,
  quantityIsReq,
  quantityValueError,
  productNotFound,
  updateSaleReturn,
  saleNotFound,
};
