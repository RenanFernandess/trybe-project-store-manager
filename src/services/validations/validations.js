const productsModule = require('../../models/products.model');

const saleItemCheck = async ({ productId, quantity }) => {
  if (!productId) return { type: 400, message: '"productId" is required' };
  if (Number.isNaN(Number(quantity))) return { type: 400, message: '"quantity" is required' };
  if (Number(quantity) <= 0) {
    return {
      type: 422, message: '"quantity" must be greater than or equal to 1',
    };
  }
  const product = await productsModule.getById(productId);
  if (!product.length) return { type: 404, message: 'Product not found' };
  return null;
};

const salesValidate = async (sales) => {
  const result = await Promise.all(sales.map((item) => saleItemCheck(item)));
  return result.find((item) => item) || ({ type: null, message: '' });
};

module.exports = {
  salesValidate,
};
