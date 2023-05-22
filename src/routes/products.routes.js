const express = require('express');
const productsController = require('../controllers/products.controller');

const productsRouter = express.Router();

productsRouter.get('/', productsController.getProducts);

productsRouter.get('/search', productsController.getProductsByQuery);

productsRouter.get('/:id', productsController.getProductById);

productsRouter.post('/', productsController.addProduct);

productsRouter.put('/:id', productsController.updateProduct);

productsRouter.delete('/:id', productsController.deleteProduct);

module.exports = productsRouter;
