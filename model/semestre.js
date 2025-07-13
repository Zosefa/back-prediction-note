const { DataTypes } = require('sequelize');
const sequelize = require('../config/configDb');

const Semestre = sequelize.define('Semestre', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    semestre: {
        type: DataTypes.STRING,
        allowNull: false
    },
    description: {
        type: DataTypes.TEXT,
        allowNull: false
    }
}, {
    timestamps: false,
    tableName: 'semestre'
});


module.exports = Semestre;
