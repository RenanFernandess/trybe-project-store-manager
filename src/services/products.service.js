const productsModel = require('../models/products.model');

const getProducts = async () => {
  const products = await productsModel.getAll();

  if (!products) return { type: 404, message: 'Product not found' };

  return { type: null, message: products };
};

module.exports = {
  getProducts,
};
