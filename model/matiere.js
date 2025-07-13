const { DataTypes } = require('sequelize');
const sequelize = require('../config/configDb');

const Matiere = sequelize.define('Matiere', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    codeM: {
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
    tableName: 'matiere'
});

module.exports = Matiere;
