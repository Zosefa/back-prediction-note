const express = require('express');
const multer = require('multer');
const routeur =  express.Router();
const path = require('path');
const fs = require('fs');
const etudiantController = require('../controller/etudiantController');

const uploadDir = path.join(__dirname, '..', 'public', 'etudiants');

if (!fs.existsSync(uploadDir)) {
    fs.mkdirSync(uploadDir, { recursive: true });
}

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'public/etudiants/');
    },
    filename: (req, file, cb) => {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
        cb(null, uniqueSuffix + '-' + file.originalname);
    }
});

const upload = multer({ storage });

routeur.post('/', upload.single('photo'), etudiantController.createHeaderEtudiant);
routeur.post('/create-contact', etudiantController.createContactEtudiant);
routeur.get('/', etudiantController.findAllEtudiant);

module.exports = routeur;