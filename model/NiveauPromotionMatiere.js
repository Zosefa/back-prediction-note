const { DataTypes } = require('sequelize');
const sequelize = require('../config/configDb');
const NiveauPromotion = require('./niveauPromotion');
const Matiere = require('./matiere');

const NiveauPromotionMatiere = sequelize.define('NiveauPromotionMatiere', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    niveauPromotionId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: NiveauPromotion,
            key: 'id'
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE'
    },
    matiereId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: Matiere,
            key: 'id'
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE'
    },
    coeff: {
        type: DataTypes.INTEGER,
        allowNull: false
    }
}, {
    timestamps: false,
    tableName: 'niveau-promotion-matiere'
});

NiveauPromotion.hasMany(NiveauPromotionMatiere, { foreignKey: 'niveauPromotionId' });
NiveauPromotionMatiere.belongsTo(NiveauPromotion, { foreignKey: 'niveauPromotionId' });
Matiere.hasMany(NiveauPromotionMatiere, { foreignKey: 'matiereId' });
NiveauPromotionMatiere.belongsTo(Matiere, { foreignKey: 'matiereId' })


module.exports = NiveauPromotionMatiere;
