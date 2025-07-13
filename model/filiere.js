const { DataTypes } = require('sequelize');
const sequelize = require('../config/configDb');

const Filiere = sequelize.define('Filiere', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    codef: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
    },
    filiere: {  
        type: DataTypes.STRING,
        allowNull: false
    },
    description: {  
        type: DataTypes.STRING,
        allowNull: false
    }
}, {
    timestamps: false,
    tableName: 'filiere'
});

module.exports = Filiere;
