const salesService = require('../services/sales.service');

const addSale = async ({ body }, res) => {
  const { type, message } = await salesService.addSale(body);

  if (type) return res.status(type).json({ message });

  return res.status(201).json(message);
};

const getSales = async (_req, res) => {
  const { type, message } = await salesService.getSales();

  if (type) return res.status(type).json({ message });

  return res.status(200).json(message);
};

const getSaleById = async ({ params: { id } }, res) => {
  const { type, message } = await salesService.getSaleById(id);

  if (type) return res.status(type).json({ message });

  return res.status(200).json(message);
};

const updateSale = async ({ params: { id }, body }, res) => {
  const { type, message } = await salesService.updateSale(id, body);
  if (type) return res.status(type).json({ message });
  return res.status(200).json(message);
};

const deleteSale = async ({ params: { id } }, res) => {
  const { type, message } = await salesService.deleteSale(id);
  if (type) return res.status(type).json({ message });
  return res.status(204).json({});
};

module.exports = {
  addSale,
  getSales,
  getSaleById,
  deleteSale,
  updateSale,
};
