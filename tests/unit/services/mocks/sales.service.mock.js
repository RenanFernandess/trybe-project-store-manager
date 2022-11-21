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

module.exports = {
  saleProducts,
  addSaleReturn,
};
