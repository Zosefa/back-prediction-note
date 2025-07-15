const { Op } = require("sequelize");
const ContactEtudiant = require("../model/contactEtudiant");
const Etudiant = require("../model/etudiant");
const Filiere = require("../model/filiere");
const Promotion = require("../model/promotion");

const createHeaderEtudiant = async (req, res) => {
    try {
        const { matricule,nom,prenom,dateNaissance,adresse,promotionId,filiereId } = req.body;
        const photoFile = req.file

        const dataFiliere = await Filiere.findByPk(filiereId);
        const dataPromotion = await Promotion.findByPk(promotionId);

        const photoPath = photoFile.filename;

        if(!dataFiliere) return res.status(404).json({message: 'filiere non trouver !'});
        if(!dataPromotion) return res.status(404).json({message: 'promotion non trouver !'});

        const nouvelEtudiant = await Etudiant.create({
            matricule,
            nom,
            prenom,
            dateNaissance,
            adresse,
            promotionId,
            filiereId,
            photo: photoPath
        });

        return res.status(201).json({
            message: 'Étudiant créé avec succès.',
            data: nouvelEtudiant.id
        });

    } catch (error) {
        res.status(500).json({message: 'une erreur c\'est produite lors de l\'insertion de l\'etudiant : ' + error.message})
    }
}

const createContactEtudiant = async (req, res) => {
    try {
        const { idEtudiant,contactEtudiant } = req.body;

        const dataEtudiant = await Etudiant.findByPk(idEtudiant);
        if(!dataEtudiant) return res.status(404).json({message: "Etudiant non trouver !"});

        const contactsToCreate = contactEtudiant.map(contact => ({
            ...contact,
            etudiantId: dataEtudiant.id
        }));

        await ContactEtudiant.bulkCreate(contactsToCreate);
        return res.status(201).json({ message: "Contacts ajoutés" });

    } catch (error) {
        res.status(500).json({message: "ereur lors de la creation des contacts de l'etudiant : " + error.message})
    }
}

const findAllEtudiant = async (req, res) => {
    try {
        const { page = 1, size = 10, search = '' } = req.query;
        const limit = parseInt(size);
        const currentPage = parseInt(page);
        const offset = (currentPage - 1) * limit;
        let where = {};

        if (search) {
            where = {
                [Op.or]: [
                { promotionId: { [Op.like]: `%${search}%` } },
                { filiereId: { [Op.like]: `%${search}%` } },
                { nom: { [Op.like]: `%${search}%` } },
                { prenom: { [Op.like]: `%${search}%` } },
                { matricule: { [Op.like]: `%${search}%` } },
                ]
            };
        }

        const result = await Etudiant.findAndCountAll({
            where,
            limit,
            offset,
            include: [
                ContactEtudiant,
                Filiere,
                Promotion
            ]
        });

        res.status(200).json({
            message: "Récupération des Filières avec succès",
            Items: result.count,
            Pages: Math.ceil(result.count / limit),
            currentPage,
            data: result.rows
        });
    } catch (error) {
        console.log(error)
        res.status(500).json({message: "erreur lors de la recuperation des etudiants : " + error.message })
    }
}

module.exports = {
    createHeaderEtudiant,
    createContactEtudiant,
    findAllEtudiant
}