const { DataTypes } = require('sequelize');
const sequelize = require('../config/configDb');

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
            this.setDataValue('identifiant', value.toUpperCase());
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
    photo: {
        type: DataTypes.STRING,
        allowNull: false
    }
}, {
    timestamps: false,
    tableName: 'etudiant'
});

module.exports = Etudiant;
