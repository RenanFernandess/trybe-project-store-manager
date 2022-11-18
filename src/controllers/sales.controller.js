const salesService = require('../services/sales.service');

const addSale = async ({ body }, res) => {
  const { type, message } = await salesService.addSale(body);

  if (type) return res.status(type).json({ message });

  return res.status(201).json(message);
};

module.exports = {
  addSale,
};
