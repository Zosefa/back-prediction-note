const { DataTypes } = require("sequelize");
const sequelize = require("../config/configDb");
const Semestre = require("./semestre");
const NiveauPromotion = require("./niveauPromotion");

const SemestreNiveauPromotion = sequelize.define('SemestreNiveauPromotion', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    semestreId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: Semestre,
            key: 'id'
        },
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE',
    },
    niveauPromotionId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: NiveauPromotion,
            key: 'id'
        },
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE'
    },
    dateDebut: {
        type: DataTypes.DATE,
        allowNull: false
    },
    dateFin: {
        type: DataTypes.DATE,
        allowNull: false
    }
}, {
    timestamps: false,
    tableName: 'semestre-niveau-promoion'
});

module.exports = SemestreNiveauPromotion;