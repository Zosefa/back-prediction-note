const { DataTypes } = require("sequelize");
const sequelize = require("../config/configDb");
const bcrypt = require('bcrypt');

const Gerant = sequelize.define("Gerant", {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    email: {
        type: DataTypes.STRING(100),
        unique: true,
        allowNull: false
    },
    nom: {
        type: DataTypes.STRING(100),
        allowNull: false        
    },
    prenom: {
        type: DataTypes.STRING(100),
        allowNull: false
    },
    password: {
        type: DataTypes.STRING(100),
        allowNull: false    
    },
    isPasswordTemp: {
        type: DataTypes.BOOLEAN,
        defaultValue: true
    },
    photo: {
        type: DataTypes.STRING,
        allowNull: true
    }
}, {
    timestamps: false,
    tableName: "gerant",
    hooks: {
        beforeCreate: async (gerant) => {
            const rawPassword = gerant.password;
            const salt = await bcrypt.genSalt(10);
            gerant.password = await bcrypt.hash(rawPassword, salt);
        },
        beforeUpdate: async (gerant) => {
            if (gerant.changed('password')) {
                const rawPassword = gerant.password;
                const salt = await bcrypt.genSalt(10);
                gerant.password = await bcrypt.hash(rawPassword, salt);
            }
        }
    }
});

Gerant.prototype.verifyPassword = async function (plainPassword) {
    const rawPassword = plainPassword;
    return await bcrypt.compare(rawPassword, this.password);
};

module.exports = Gerant;