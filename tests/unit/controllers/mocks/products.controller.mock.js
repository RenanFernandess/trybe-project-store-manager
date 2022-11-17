const products = [
  {
    "id": 1,
    "name": "Martelo de Thor"
  },
  {
    "id": 2,
    "name": "Traje de encolhimento"
  },
  {
    "id": 3,
    "name": "Escudo do Capitão América"
  }
];

const getProductsOk = {
  type: null,
  message: products,
};

const getProductByIdOk = {
  type: null,
  message: [products[0]],
}

const nothingFoundError = { type: 404, message: 'Product not found' };

const newProduct = {
  id: 7,
  name: 'peixe xablau',
};

const addProductOk = {
  type: null,
  message: newProduct,
}

const addProductError = { type: 400, message: '"name" is required' };

module.exports = {
  products,
  getProductsOk,
  getProductByIdOk,
  addProductOk,
  addProductError,
  nothingFoundError,
  newProduct,
};
