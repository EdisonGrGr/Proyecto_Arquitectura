const UserDto = require('../dto/user.dto');


const validateRegister = (req, res, next) => {
    try {
        
        const validatedData = UserDto.validate(req.body);
        
        
        req.body = validatedData;
        next();
    } catch (error) {
        
        res.status(400).json({
            success: false,
            message: error.message
        });
    }
};

module.exports = {
    validateRegister
};