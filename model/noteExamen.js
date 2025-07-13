const { DataTypes } = require("sequelize");
const sequelize = require("../config/configDb");
const Matiere = require("./matiere");
const Etudiant = require("./etudiant");

const NoteExamen = sequelize.define('NoteExamen', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    matiereId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: Matiere,
            key: 'id'
        },
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE'
    },
    etudiantId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: Etudiant,
            key: 'key'
        },
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE'
    }
}, {
    timestamps: false,
    tableName: 'note-examen'
});

module.exports = NoteExamen;