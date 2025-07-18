const { DataTypes } = require('sequelize');
const sequelize = require('../config/configDb');

const Niveau = sequelize.define('Niveau', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    codeN: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
    },
    niveau: {  
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
    },
    description: {  
        type: DataTypes.STRING,
        allowNull: false
    }
}, {
    timestamps: false,
    tableName: 'niveau'
});

module.exports = Niveau;
