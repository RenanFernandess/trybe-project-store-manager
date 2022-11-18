const express = require('express');
const salesController = require('../controllers/sales.controller');

const salesRoute = express.Router();

salesRoute.post('/', salesController.addSale);

module.exports = { salesRoute };
