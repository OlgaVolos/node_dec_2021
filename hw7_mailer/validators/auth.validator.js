const Joi = require('joi');

const {emailValidator, passwordValidator} = require("./common.valadator");

module.exports = {
    login: Joi.object({
        email: emailValidator.required(),
        password: passwordValidator.required(),
    }),
    forgotPassword: Joi.object({
        email: emailValidator.required(),
    })
};
