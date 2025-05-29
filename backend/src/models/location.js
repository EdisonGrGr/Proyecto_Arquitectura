const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/database');

const Ubicacion = sequelize.define('ubicacion', {
    id_ubicacion: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        allowNull: false,
    },
    edificio: {
        type: DataTypes.TEXT,
        allowNull: false,
    },
    piso: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
            min: 0,
        },
    },
    descripcion: {
        type: DataTypes.TEXT,
    },
}, {
    tableName: 'ubicacion',
    schema: 'proyecto',
    timestamps: false,
});

Ubicacion.associate = (models) => {
    
    Ubicacion.hasMany(models.aula, {
        foreignKey : 'id_ubicacion',
        as         : 'aulas',
        sourceKey  : 'id_ubicacion'
    });
}

module.exports = Ubicacion;