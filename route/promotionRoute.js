const express = require('express');
const routeur =  express.Router();
const promotionController = require('../controller/promotionController');

routeur.post('/', promotionController.createPromotion);
routeur.get('/', promotionController.findAllPromotion);
routeur.get('/:id', promotionController.findById);
routeur.put('/:id', promotionController.updatePromotion);
routeur.delete('/:id', promotionController.deletePromotion);

module.exports = routeur;