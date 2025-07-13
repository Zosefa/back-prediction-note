const express = require('express');
const routeur =  express.Router();
const niveauController = require('../controller/niveauController');

routeur.post('/', niveauController.createNiveau);
routeur.get('/', niveauController.findAllNiveau);
routeur.get('/:id', niveauController.findById);
routeur.put('/:id', niveauController.updateNiveau);
routeur.delete('/:id', niveauController.deleteNiveau);

module.exports = routeur;