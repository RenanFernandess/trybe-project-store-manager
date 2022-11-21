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

const porductIdIsReq = { type: 400, message: '"productId" is required' };
const quantityIsReq = { type: 400, message: '"quantity" is required' };
const quantityValueError = {
  type: 422, message: '"quantity" must be greater than or equal to 1',
};
const productNotFound = { type: 404, message: 'Product not found' }

module.exports = {
  saleProducts,
  addSaleReturn,
  porductIdIsReq,
  quantityIsReq,
  quantityValueError,
  productNotFound,
};
