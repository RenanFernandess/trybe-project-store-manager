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

const getSaleDetails = async (saleId) => {
  const [result] = await connection.execute(
    `SELECT product_id AS 'productId', quantity FROM StoreManager.sales_products
     WHERE sale_id = (?)`,
    [saleId],
  );
  return result;
};

module.exports = {
  insertSale,
  insertSaleProducts,
  getSaleDetails,
};
