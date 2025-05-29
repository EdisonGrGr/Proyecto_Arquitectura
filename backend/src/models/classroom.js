const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/database');

const Aula = sequelize.define('aula', {
    
    id_aula: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        allowNull: false,
    },
    id_asignatura: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    id_ubicacion: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    capacidad: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
            min: 1,
        },
    },
}, {
    tableName: 'aula',
    schema: 'proyecto',
    timestamps: false,
});

Aula.associate = (models) => {

    Aula.belongsTo(models.asignatura, {
        foreignKey : 'id_asignatura',
        as         : 'asignatura',
        targetKey: 'id_asignatura'
    });
    Aula.belongsTo(models.ubicacion, {
        foreignKey : 'id_ubicacion',
        as         : 'ubicacion',
        targetKey: 'id_ubicacion'
    });
};


module.exports = Aula;