const { DataTypes } = require('sequelize');
const sequelize = require('../config/configDb');

const Promotion = sequelize.define('Promotion', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    codeP: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
    },
    promotion: {  
        type: DataTypes.STRING,
        allowNull: false
    },
    description: {  
        type: DataTypes.STRING,
        allowNull: false
    }
}, {
    timestamps: false,
    tableName: 'promotion'
});

module.exports = Promotion;
