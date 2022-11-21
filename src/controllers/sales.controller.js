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

module.exports = {
  addSale,
  getSales,
};
