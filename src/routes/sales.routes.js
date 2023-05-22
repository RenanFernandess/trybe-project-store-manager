const express = require('express');
const salesController = require('../controllers/sales.controller');

const salesRoute = express.Router();

salesRoute.post('/', salesController.addSale);

salesRoute.get('/', salesController.getSales);

salesRoute.get('/:id', salesController.getSaleById);

salesRoute.delete('/:id', salesController.deleteSale);

module.exports = { salesRoute };
