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

const saleProductsError = [
  {
    "quantity": 1
  },
  {
    "productId": 2,
    "quantity": 5
  }
];

const sales = [
  {
    "saleId": 1,
    "date": "2023-05-19T19:30:27.000Z",
    "productId": 2,
    "quantity": 10
  },
  {
    "saleId": 2,
    "date": "2023-05-19T19:30:27.000Z",
    "productId": 3,
    "quantity": 15
  }
]

const [sale] = sales;

const addSaleReturn = {
  type: null,
  message: {
    id: 1,
    itemsSold: saleProducts,
  },
};

const productIdIsReq = { type: 400, message: '"productId" is required' };

module.exports = {
  saleProducts,
  addSaleReturn,
  productIdIsReq,
  saleProductsError,
  sales,
  sale,
};
