const salesModel = require('../models/sales.model');
const { salesValidate } = require('./validations/validations');

const addSale = async (sales) => {
  const { type, message } = await salesValidate(sales);
  if (type) return { type, message };

  const saleId = await salesModel.insertSale();
  await Promise.all(
    sales.map(async (product) => salesModel.insertSaleProducts(saleId, product)),
  );
  const result = await salesModel.getSaleDetails(saleId);

  return {
    type: null,
    message: { id: saleId, itemsSold: result },
  };
};

const getSales = async () => {
  const result = await salesModel.getAll();

  if (!result.length) return { type: 404, message: 'Sale not found' };

  return { type: null, message: result };
};

const getSaleById = async (id) => {
  const result = await salesModel.findById(id);

  if (!result.length) return { type: 404, message: 'Sale not found' };

  return { type: null, message: result };
};

const deleteSale = async (id) => {
  const check = await salesModel.findById(id);
  if (!check.length) return { type: 404, message: 'Sale not found' };
  await salesModel.remove(id);
  return { type: null, message: '' };
};

module.exports = {
  addSale,
  getSales,
  getSaleById,
  deleteSale,
};
