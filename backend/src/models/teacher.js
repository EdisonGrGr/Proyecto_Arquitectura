const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/database');

const Docente = sequelize.define('docente', {
    
    id_docente: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        allowNull: false,
    },
    id_gmail: {
        type: DataTypes.TEXT,
        unique: true,
    },
    nombre: {
        type: DataTypes.TEXT,
        allowNull: false,
    },
    apellido: {
        type: DataTypes.TEXT,
        allowNull: false,
    },
}, {
    tableName: 'docente',
    schema: 'proyecto',
    timestamps: false,
});


Docente.associate = (models) => {

    Docente.belongsTo(models.usuario, {
        foreignKey : 'id_gmail',
        as         : 'usuario',
        targetKey  : 'id_gmail'
    });
    Docente.hasMany(models.asignatura, {
        foreignKey : 'id_docente',
        as         : 'asignaturas',
        sourceKey  : 'id_docente'
    });
};

module.exports = Docente;
