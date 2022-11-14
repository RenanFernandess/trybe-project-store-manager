const productsModel = require('../models/products.model');

const getProducts = async () => {
  const products = await productsModel.getAll();

  if (!products) return { type: 404, message: 'Product not found' };

  return {
    type: null,
    message: products.sort((productA, productB) => productA.id - productB.id),
  };
};

// const getProductsById = async (id) => {
//   const product = await productsModel.getById(id);

//   if (!product) return { type: 404, message: 'Product not found' };

//   return { type: null, message: product };
// };

module.exports = {
  getProducts,
  // getProductsById,
};
