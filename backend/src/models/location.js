const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/database');

const Ubicacion = sequelize.define('ubicacion', {
    id_ubicacion: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
    },
    nombre: {
        type: DataTypes.TEXT,
        allowNull: false,
    },
    descripcion: {
        type: DataTypes.TEXT,
    },
    latitud: {
        type: DataTypes.DECIMAL(10, 8),
        allowNull: true
    },
    longitud: {
        type: DataTypes.DECIMAL(11, 8),
        allowNull: true
    }
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