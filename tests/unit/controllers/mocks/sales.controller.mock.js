const addSaleReturn = {
  type: null,
  message: {
    id: 1,
    itemsSold: [
      {
        "productId": 1,
        "quantity": 1
      },
      {
        "productId": 2,
        "quantity": 5
      }
    ],
  },
};

const porductIdIsReq = { type: 400, message: '"productId" is required' };

module.exports = {
  addSaleReturn,
  porductIdIsReq,
};
