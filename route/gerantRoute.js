const express = require('express');
const multer = require('multer');
const routeur =  express.Router();
const path = require('path');
const fs = require('fs');
const gerantController = require('../controller/gerantController');

const uploadDir = path.join(__dirname, '..', 'public', 'gerant');

if (!fs.existsSync(uploadDir)) {
    fs.mkdirSync(uploadDir, { recursive: true });
}

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'public/gerant/');
    },
    filename: (req, file, cb) => {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
        cb(null, uniqueSuffix + '-' + file.originalname);
    }
});

const upload = multer({ storage });

routeur.post('/', gerantController.createGerant);
routeur.put('/update/:id', upload.single('photo'), gerantController.updateGerant);
routeur.get('/', gerantController.findAllCompteGerant);
routeur.get('/:email', gerantController.findByEmail);

module.exports = routeur;