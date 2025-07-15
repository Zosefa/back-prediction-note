const { DataTypes } = require('sequelize');
const sequelize = require('../config/configDb');
const Etudiant = require('./etudiant');

const ContactEtudiant = sequelize.define('ContactEtudiant', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    etudiantId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: Etudiant,
            key: 'id'
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE'
    },
    contact: {
        type: DataTypes.STRING,
        allowNull: false
    }
}, {
    timestamps: false,
    tableName: 'contact-etudiant'
});

Etudiant.hasMany(ContactEtudiant, { foreignKey: 'etudiantId' });
ContactEtudiant.belongsTo(Etudiant, { foreignKey: 'etudiantId' });

module.exports = ContactEtudiant;
