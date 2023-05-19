const connection = require('./db/connection');

const getAll = async () => {
  const [result] = await connection.execute(
    'SELECT * FROM StoreManager.products',
  );
  return result;
};

const getById = async (id) => {
  const [result] = await connection.execute(
    'SELECT * FROM StoreManager.products WHERE id = (?)',
    [id],
  );
  return result;
};

const insert = async (product) => {
  const [{ insertId }] = await connection.execute(
    'INSERT INTO StoreManager.products (name) VALUE (?)',
    [product.name],
  );

  const [result] = await getById(insertId);

  return result;
};

const update = async (id, { name }) => {
  await connection.execute(
    `UPDATE StoreManager.products SET name = (?)
     WHERE id = (?)`,
    [name, id],
  );
  const [result] = await getById(id);

  return result;
};

const remove = async (id) => {
  await connection.execute(
    'DELETE FROM StoreManager.products WHERE id = (?)',
    [id],
  );
};

module.exports = {
  getAll,
  getById,
  insert,
  update,
  remove,
};
