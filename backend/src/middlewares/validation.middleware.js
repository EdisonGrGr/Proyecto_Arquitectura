

const validateRegister = (req, res, next) => {
    
    const { id_gmail, nombre, apellido, id_rol, password } = req.body;

    
    if (!id_gmail || !id_gmail.includes('@')) {
        return res.status(400).json({ message: 'Email inválido' });
    }

    
    if (!nombre || nombre.trim().length < 2) {
        return res.status(400).json({ message: 'Nombre inválido' });
    }

    
    if (!apellido || apellido.trim().length < 2) {
        return res.status(400).json({ message: 'Apellido inválido' });
    }

    
    if (!id_rol || ![1, 2].includes(parseInt(id_rol))) {
        return res.status(400).json({ message: 'Rol inválido' });
    }

    
    if (!password || password.length < 6) {
        return res.status(400).json({ message: 'La contraseña debe tener al menos 6 caracteres' });
    }

    next();
};

module.exports = {
    validateRegister
};