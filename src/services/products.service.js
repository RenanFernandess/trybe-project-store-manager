const productsModel = require('../models/products.model');

const getProducts = async () => {
  const products = await productsModel.getAll();

  if (!products.length) return { type: 404, message: 'Product not found' };

  return {
    type: null,
    message: products.sort((productA, productB) => productA.id - productB.id),
  };
};

const getProductById = async (id) => {
  const product = await productsModel.getById(id);

  if (!product.length) return { type: 404, message: 'Product not found' };

  return { type: null, message: product };
};

const addProduct = async (product) => {
  const { name } = product;
  if (!name) return { type: 400, message: '"name" is required' };
  if (name.length < 5) {
    return { type: 422, message: '"name" length must be at least 5 characters long' };
  }

  const result = await productsModel.insert(product);

  return { type: null, message: result };
};

module.exports = {
  getProducts,
  getProductById,
  addProduct,
};
