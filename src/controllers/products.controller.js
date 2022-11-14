const productsService = require('../services/products.service');

const getProducts = async (_req, res) => {
  const { type, message } = await productsService.getProducts();

  if (type) return res.status(type).json({ message });

  return res.status(200).json(message);
};

const getProductsById = async (req, res) => res.status(200).json([]);

module.exports = {
  getProducts,
  getProductsById,
};
