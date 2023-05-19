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

module.exports = {
  saleProducts,
  sales,
  sale,
};
