const { DataTypes } = require('sequelize');
const sequelize = require('../config/configDb');
const Niveau = require('./niveau');
const Promotion = require('./promotion');

const NiveauPromotion = sequelize.define('NiveauPromotion', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    niveauId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: Niveau,
            key: 'id'
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE'
    },
    promotionId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: Promotion,
            key: 'id'
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE'
    },
    dateDebut: {
        type: DataTypes.DATE(NOW()),
        allowNull: false
    },
    dateFin: {
        type: DataTypes.DATE(),
        allowNull: false
    }
}, {
    timestamps: false,
    tableName: 'niveau-promotion'
});

Promotion.hasMany(NiveauPromotion, { foreignKey: 'promotionId' });
NiveauPromotion.belongsTo(Promotion, { foreignKey: 'promotionId' });


module.exports = NiveauPromotion;
