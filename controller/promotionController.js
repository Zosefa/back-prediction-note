const { json } = require("sequelize");
const Promotion = require("../model/promotion");

const createPromotion = async (req, res) => {
    try {
        const { codeP,promotion,description } = req.body;
        const result = await Promotion.create({ codeP,promotion,description });
        res.status(201).json({message: 'promotion creer avec success !', data: result});
    } catch (error) {
        res.status(500).json({message: 'erreur lors de la creation du promotion : ' + error.message})
    }
}

const findAllPromotion = async (req, res) => {
    try {
        const { page = 1, size = 10, search = '' } = req.query;
        const limit = parseInt(size);
        const currentPage = parseInt(page);
        const offset = (currentPage - 1) * limit;
        const where = {};

        if (search) {where.codeP = {[Op.like]: `%${search}%`};}

        const result = await Promotion.findAndCountAll({
            where,
            limit,
            offset
        });

        res.status(200).json({
            message: "Récupération des promotions avec succès",
            Items: result.count,
            Pages: Math.ceil(result.count / limit),
            currentPage,
            data: result.rows
        });
    } catch (error) {
        res.status(500).json({message: 'erreur lors de la recuperation du promotion : ' + error.message})
    }
}

const findById = async (req, res) => {
    try {
        const { id } = req.params;
        const result = await Promotion.findByPk(id);

        if(!result) return res.status(404).json({message: 'promotion non trouver !'});
        res.status(200).json({message: 'promotion recuperer !', data: result});
    } catch (error) {
        res.status(500),json({message: 'erreur lors de la recuperation du promotion : ' + error.message})
    }
}

const updatePromotion = async (req, res) => {
    try {
        const { id } = req.params;
        const { codeP,promotion,description } = req.body;
        
        const data = await Promotion.findByPk(id);
        if(!data) return res.status(404).json({message: 'promotion non trouver !'});

        const result = await Promotion.update({ codeP,promotion,description }, {where: {id}});
        res.status(200).json({message: 'modification de la promotion effectuer !', data: result});
    } catch (error) {
        res.status(500).json({message: 'erreur lors de la modifictaion de la promotion : ' + error.message})
    }
}

const deletePromotion = async (req, res) => {
    try {
        const { id } = req.params;
        const data = await Promotion.findByPk(id);

        if(!data) return res.status(404).json({message: 'promotion non trouver !'});

        await data.destroy();
        res.status(200).json({message: 'promotion supprimer !'})
    } catch (error) {
        res.status(500).json({message: 'erreur lors de la suppression de la promotio : ' + error.message})
    }
}

module.exports = {
    createPromotion,
    findAllPromotion,
    findById,
    updatePromotion,
    deletePromotion
}