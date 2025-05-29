const Usuario = require('../models/user');

class UserService {
    async registerUser(userData) {
        try {
            const existingUser = await Usuario.findOne({
                where: { id_gmail: userData.id_gmail }
            });

            if (existingUser) {
                throw new Error('El correo electrónico ya está registrado');
            }

            const newUser = await Usuario.create(userData);
            return newUser;
        } catch (error) {
            throw error;
        }
    }
}

module.exports = new UserService();