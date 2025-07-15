const express = require('express');
const routeur =  express.Router();
const authController = require('../controller/authController');

routeur.post('/login', authController.login);
routeur.post('/refresh-token', authController.refreshToken);
routeur.post('/logout', authController.logout);
routeur.put("/activate-compte", authController.activateCompte);

module.exports = routeur;