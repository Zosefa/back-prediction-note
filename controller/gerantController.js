const { json, Op } = require("sequelize");
const Gerant = require("../model/gerant");
const bcrypt = require('bcrypt');
const path = require('path');
const fs = require('fs');

const createGerant = async (req, res) => {
    try {
        const {email,nom,prenom,password} = req.body;
        const isPasswordTemp = true;

        const data = await Gerant.findOne({ where: { email } });
        if(data) return res.status(500).json({message: "l'email est dejas utiliser : " + email});

        await Gerant.create({email,nom,prenom,password,isPasswordTemp});
        res.status(201).json({message: "compte du nouveau Gerant créé !"});
    } catch (error) {
        res.status(500).json({message: "erreur lors de la creation du gerant : " + error.message});
    }
}

const findAllCompteGerant = async (req, res) => {
    try {
        const { page = 1, size = 10, search = '' } = req.query;
        const limit = parseInt(size);
        const currentPage = parseInt(page);
        const offset = (currentPage - 1) * limit;
        const where = {};

        if (search) {where.email = {[Op.like]: `%${search}%`};}

        const result = await Gerant.findAndCountAll({
            where,
            limit,
            offset
        });

        res.status(200).json({
            message: "Récupération des Compte avec succès",
            Items: result.count,
            Pages: Math.ceil(result.count / limit),
            currentPage,
            data: result.rows
        });
    } catch (error) {
        res.status(500).json({message: "erreur lors de la recuperation des comptes gerants : " + error.message})
    }
}

const updateGerant = async (req, res) => {
    try {
        const {email,nom,prenom,password} = req.body;
        const {id} = req.params;
        const photoFile = req?.file;

        const photoPath = photoFile?.filename;

        const data = await Gerant.findByPk(id);
        if(!data) return res.status(404).json({message: 'Gerant non trouver !'});

        let newPassword;

        if(password.trim() !== "" )
        {
            const salt = await bcrypt.genSalt(10);
            newPassword = await bcrypt.hash(password, salt);
        }else{
            newPassword = data.password;
        }

        if(photoPath == ""){
            await Gerant.update({email,nom,prenom,password: newPassword},{where: {id}});
        }else{
            if (data.photo) {
                const oldPhotoPath = path.join(__dirname, '..', 'public', 'gerant', data.photo);
                if (fs.existsSync(oldPhotoPath)) {
                    fs.unlinkSync(oldPhotoPath);
                }
            }
            await Gerant.update({email,nom,prenom,password: newPassword, photo: photoPath},{where: {id}});
        }
        res.status(200).json({message: 'profil mise a jour !'});
    } catch (error) {
        res.status(500).json({message: "erreur lors de la modification du profil : " + error.message});
    }
}

const findByEmail = async (req, res) => {
    try {
        const {email} = req.params;
        const data = await Gerant.findOne({where: {email}});

        if(!data) return res.status(404).json({message: "Compte associer a l'email " + email + "non trouver"});
        res.status(200).json({data: data});
    } catch (error) {
        res.status(500).json({message: "erreur lors de la recuperation des info du compte : " + error.message})
    }
}

module.exports = {
    createGerant,
    findAllCompteGerant,
    updateGerant,
    findByEmail
}