const express = require('express');
const productsController = require('../controllers/products.controller');

const productsRouter = express.Router();

productsRouter.get('/', productsController.getProducts);

productsRouter.get('/:id', productsController.getProductById);

productsRouter.post('/', productsController.addProduct);

productsRouter.put('/:id', productsController.updateProduct);

module.exports = productsRouter;
