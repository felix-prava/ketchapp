//Validation
const Joi = require('@hapi/joi');

//Register validation
const registerValidation = (data) => {
    const schema = Joi.object({
        name: Joi.string()
            .min(6)
            .max(255)
            .required(),
        email: Joi.string()
            .min(6)
            .max(255)
            .required()
            .email(),
        username: Joi.string()
            .min(6)
            .required(),
        password: Joi.string()
            .min(6)
            .required(),
        country: Joi.string()
            .min(5)
            .required(),
    });
    return schema.validate(data);
};

//Login validation
const loginValidation = (data) => {
    const schema = Joi.object({
        username: Joi.string()
            .min(6)
            .max(255)
            .required()
            .email(),
        password: Joi.string()
            .min(6)
            .required(),
    });
    return schema.validate(data);
};

module.exports.registerValidation = registerValidation;
module.exports.loginValidation = loginValidation;
