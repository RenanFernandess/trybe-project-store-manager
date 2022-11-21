const express = require('express');
const salesController = require('../controllers/sales.controller');

const salesRoute = express.Router();

salesRoute.post('/', salesController.addSale);

salesRoute.get('/', salesController.getSales);

salesRoute.get('/:id', salesController.getSaleById);

module.exports = { salesRoute };
