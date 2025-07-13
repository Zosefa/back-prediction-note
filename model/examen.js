const { DataTypes } = require("sequelize");
const sequelize = require("../config/configDb");
const SemestreNiveauPromotion = require("./semestreNiveauPromotion");

const Examen = sequelize.define('Examen',{
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    dateExamen: {
        type: DataTypes.DATE,
        allowNull: false
    },
    semestreNiveauPromotionId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: SemestreNiveauPromotion,
            key: 'id'
        },
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE'
    }
}, {
    timestamps: false,
    tableName: 'examen'
});

module.exports = Examen;