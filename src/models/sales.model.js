const connection = require('./db/connection');

const insertSale = async () => {
  const [{ insertId }] = await connection.execute(
    'INSERT INTO StoreManager.sales (date) VALUES (NOW())',
  );
  return insertId;
};

const insertSaleProducts = async (saleId, { productId, quantity }) => {
  await connection.execute(
    'INSERT INTO StoreManager.sales_products (sale_id, product_id, quantity) VALUE (?, ?, ?)',
    [saleId, productId, quantity],
  );
};

module.exports = {
  insertSale,
  insertSaleProducts,
};
