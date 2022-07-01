const Joi = require('joi');

const {emailValidator} = require("./common.validator");


module.exports = {
    findAll: Joi.object({
        name: Joi.string().alphanum().min(2).max(100),
        age: Joi.number().integer().min(1).max(130),
        email: emailValidator,
    })// email не рекомендовано валідувати email(), щоб не було конфліктів з фронтом
};
