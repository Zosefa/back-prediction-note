const { Op } = require("sequelize");
const Niveau = require("../model/niveau");

const createNiveau =  async (req, res) => {
    try {
        const { codeN,niveau,description } = req.body;
        const newNiveau = await Niveau.create({ codeN,niveau,description });
        res.status(201).json({message: 'niveau d\'étude créé', data: newNiveau});
    } catch (error) {
        res.status(500).json({message: 'erreur lors de la creation du niveau ' + error.message})
    }
}

const findAllNiveau = async (req, res) => {
    try {
        const { page = 1, size = 10, search = '' } = req.query;
        const limit = parseInt(size);
        const currentPage = parseInt(page);
        const offset = (currentPage - 1) * limit;
        const where = {};

        if (search) {where.codeN = {[Op.like]: `%${search}%`};}

        const result = await Niveau.findAndCountAll({
            where,
            limit,
            offset
        });

        res.status(200).json({
            message: "Récupération des Niveaux avec succès",
            Items: result.count,
            Pages: Math.ceil(result.count / limit),
            currentPage,
            data: result.rows
        });
    } catch (error) {
        res.status(500).json({message: 'erreur lors de la recuperation du niveau ' + error.message})
    }
}

const findById = async (req, res) => {
    try {
        const { id } = req.params;
        const result = await Niveau.findByPk(id);

        if(!result) return res.status(404).json({message: 'Niveau non trouvé'});
        res.status(200).json({message: 'Niveau recuperer', data: result});
    } catch (error) {
        res.status(500).json({message: 'erreur lors de la recuperation du niveau ' + error.message});
    }
}

const updateNiveau = async (req, res) => {
    try {
        const {id} = req.params;
        const { codeN,niveau,description } = req.body;
        
        const data = await Niveau.findByPk(id);
        if(!data) return res.status(404).json({message: 'Niveau non trouver !'});

        const result = await Niveau.update({ codeN,niveau,description }, { where: {id} });

        res.status(200).json({ message: 'niveau d\'etude modifier !', data: result });

    } catch (error) {
        res.status(500).json({message: 'erreur lors de la modification de niveau d\'etudte : ' + error.message});
    }
}

const deleteNiveau = async (req, res) => {
    try {
        const {id} = req.params;
        const data = await Niveau.findByPk(id);

        if(!data) return res.status(404).json({message: 'Niveau non trouver !'});

        await data.destroy();

        res.status(200).json({message: 'suppression éfféctuer !'});
        
    } catch (error) {
        res.status(500).json({message: 'erreur lors de la suppression de niveau d\'etudte : ' + error.message});
    }
}

module.exports = {
    createNiveau,
    findAllNiveau,
    findById,
    updateNiveau,
    deleteNiveau
}