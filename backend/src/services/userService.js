const Usuario = require('../models/user');
const Docente = require('../models/teacher');
const Estudiante = require('../models/students');


class UserService {
  async registerUser(userData) {
    const transaction = await Usuario.sequelize.transaction();

    try {
      
      const existingUser = await Usuario.findOne({
        where: { id_gmail: userData.id_gmail }
      });

      if (existingUser) {
        throw new Error('El correo electrónico ya está registrado');
      }

      
      const newUser = await Usuario.create(userData, { transaction });

      
      switch (userData.id_rol) {
        case 1: // Estudiante
          await Estudiante.create(
            { id_gmail: userData.id_gmail },
            { transaction }
          );
          break;
        case 2: 
          await Docente.create(
  {
    id_gmail: userData.id_gmail,
    nombre: userData.nombre,
    apellido: userData.apellido
  },
  { transaction }
);
          break;
        case 3: 
          break;
        default:
          throw new Error('Rol no válido');
      }

      await transaction.commit();
      return newUser;

    } catch (error) {
      await transaction.rollback();
      throw error;
    }
  }
}


module.exports = new UserService();