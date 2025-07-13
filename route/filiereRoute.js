const express = require('express');
const routeur =  express.Router();
const filiereController = require('../controller/filiereController');

routeur.post('/', filiereController.createFiliere);
routeur.get('/', filiereController.findAllFiliere);
routeur.get('/:id', filiereController.findById);
routeur.put('/:id', filiereController.updateFiliere);
routeur.delete('/:id', filiereController.deleteFiliere);

module.exports = routeur;