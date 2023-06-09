const productsModel = require('../models/products.model');

const PRODUCT_NOT_FOUND = 'Product not found';

const getProducts = async () => {
  const products = await productsModel.getAll();

  if (!products.length) return { type: 404, message: PRODUCT_NOT_FOUND };

  return {
    type: null,
    message: products.sort((productA, productB) => productA.id - productB.id),
  };
};

const getProductsByQuery = async (name) => {
  const products = await (name ? productsModel.findByQuery(name) : productsModel.getAll());

  return {
    type: null,
    message: products,
  };
};

const getProductById = async (id) => {
  const product = await productsModel.getById(id);

  if (!product.length) return { type: 404, message: PRODUCT_NOT_FOUND };

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

const updateProduct = async (id, product) => {
  const { name } = product;
  if (!name) return { type: 400, message: '"name" is required' };
  if (name.length < 5) {
    return { type: 422, message: '"name" length must be at least 5 characters long' };
  }

  const check = await productsModel.getById(id);
  if (!check.length) return { type: 404, message: PRODUCT_NOT_FOUND };

  const result = await productsModel.update(id, product);

  return { type: null, message: result };
};

const deleteProduct = async (id) => {
  const check = await productsModel.getById(id);
  if (!check.length) return { type: 404, message: PRODUCT_NOT_FOUND };
  await productsModel.remove(id);
  return { type: null, message: '' };
};

module.exports = {
  getProducts,
  getProductById,
  addProduct,
  updateProduct,
  deleteProduct,
  getProductsByQuery,
};
