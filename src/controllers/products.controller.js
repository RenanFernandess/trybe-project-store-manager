const productsService = require('../services/products.service');

const getProducts = async (_req, res) => {
  const { type, message } = await productsService.getProducts();

  if (type) return res.status(type).json({ message });

  return res.status(200).json(message);
};

const getProductById = async ({ params: { id } }, res) => {
  const { type, message } = await productsService.getProductById(id);

  if (type) return res.status(type).json({ message });

  return res.status(200).json(message[0]);
};

const addProduct = async ({ body }, res) => {
  const { type, message } = await productsService.addProduct(body);

  if (type) return res.status(type).json({ message });

  return res.status(201).json(message);
};

const updateProduct = async ({ params: { id }, body }, res) => {
  const { type, message } = await productsService.updateProduct(id, body);

  if (type) return res.status(type).json({ message });

  return res.status(200).json(message);
};

const deleteProduct = async ({ params: { id } }, res) => {
  const { type, message } = await productsService.deleteProduct(id);
  if (type) return res.status(type).json({ message });
  return res.status(204).json({});
};

module.exports = {
  getProducts,
  getProductById,
  addProduct,
  updateProduct,
  deleteProduct,
};
