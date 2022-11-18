const salesModule = require('../models/sales.model');
const { salesValidate } = require('./validations/validations');

const addSale = async (sales) => {
  const { type, message } = await salesValidate(sales);
  if (type) {
    console.log('ok');
    return { type, message };
  }

  const saleId = await salesModule.insertSale();
  await Promise.all(
    sales.map(async (product) => salesModule.insertSaleProducts(saleId, product)),
  );
  const result = await salesModule.getSaleDetails(saleId);

  return {
    type: null,
    message: { id: saleId, itemsSold: result },
  };
};

module.exports = {
  addSale,
};
