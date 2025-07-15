const { DataTypes } = require('sequelize');
const sequelize = require('../config/configDb');
const Promotion = require('./promotion');
const Filiere = require('./filiere');

const Etudiant = sequelize.define('Etudiant', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    matricule: {
        type: DataTypes.STRING,
        unique: true,
        allowNull: false,
        set(value) {
            this.setDataValue('matricule', value.toUpperCase());
        }
    },
    nom: {
        type: DataTypes.STRING,
        allowNull: false
    },
    prenom: {
        type: DataTypes.STRING,
        allowNull: false
    },
    dateNaissance: {
        type: DataTypes.DATE,
        allowNull: false
    },
    adresse: {
        type: DataTypes.STRING,
        allowNull: false
    },
    promotionId: {
        type: DataTypes.INTEGER,
        references: {
            model: Promotion,
            key: 'id'
        },
        onUpdate: 'CASCADE'
    },
    filiereId: {
        type: DataTypes.INTEGER,
        references: {
            model: Filiere,
            key: 'id'
        },
        onUpdate: 'CASCADE'
    },
    photo: {
        type: DataTypes.STRING,
        allowNull: false
    }
}, {
    timestamps: false,
    tableName: 'etudiant'
});

Promotion.hasMany(Etudiant, { foreignKey: 'promotionId' });
Etudiant.belongsTo(Promotion, { foreignKey: 'promotionId' });

Filiere.hasMany(Etudiant, { foreignKey: 'filiereId' });
Etudiant.belongsTo(Filiere, { foreignKey: 'filiereId' });

module.exports = Etudiant;
