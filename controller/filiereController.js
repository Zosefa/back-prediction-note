const { Op } = require("sequelize");
const Filiere = require("../model/filiere");

const createFiliere = async (req, res) => {
    try {
        const { codef,filiere,description } = req.body;
        const result = await Filiere.create({ codef,filiere,description });

        res.status(201).json({message: 'filiere inserer avec success !', data: result});
    } catch (error) {
        res.status(500).json({message: 'erreur lors de la creation de filiere : ' + error.message})
    }
}

const findAllFiliere = async (req, res) => {
    try {
        const { page = 1, size = 10, search = '' } = req.query;
        const limit = parseInt(size);
        const currentPage = parseInt(page);
        const offset = (currentPage - 1) * limit;
        const where = {};

        if (search) {where.codef = {[Op.like]: `%${search}%`};}

        const result = await Filiere.findAndCountAll({
            where,
            limit,
            offset
        });

        res.status(200).json({
            message: "Récupération des Filières avec succès",
            Items: result.count,
            Pages: Math.ceil(result.count / limit),
            currentPage,
            data: result.rows
        });
    } catch (error) {
        res.status(500).json({message: 'erreur lors de la récupération de des filières : ' + error.message})
    }
}

const findById = async (req, res) => {
    try {
        const { id } = req.params;
        const result = await Filiere.findByPk(id);

        if(!result) return res.status(404).json({message: 'filière non trouver !'});

        res.status(200).json({message: 'filiere recuperer !', data: result});
    } catch (error) {
        res.status(500).json({message: 'erreur lors de la recuperation du filiere : ' + error.message})
    }
}

const updateFiliere = async (req, res) => {
    try {
        const { id } = req.params;
        const { codef,filiere,description } = req.body;

        const data = await Filiere.findByPk(id);
        if(!data) return res.status(404).json({message: 'filiere non trouver !'});

        const result = await Filiere.update({ codef,filiere,description }, {where: {id}});
        res.status(200).json({message: 'filiere mise a jour !', data: result});
    } catch (error) {
        res.status(500).json({message: 'erreur lors de la modification du filiere : ' + error.message})
    }
}

const deleteFiliere = async (req, res) => {
    try {
        const { id } = req.params;

        const data = await Filiere.findByPk(id);
        if(!data) return res.status(404).json({message: 'filiere non trouver !'});

        await data.destroy();
        res.status(200).json({message: 'filiere Supprimer !'});
    } catch (error) {
        res.status(500).json({message: 'erreur lors de la suppression du filiere : ' + error.message})
    }
}

module.exports = {
    createFiliere, 
    findAllFiliere,
    findById,
    updateFiliere,
    deleteFiliere
}