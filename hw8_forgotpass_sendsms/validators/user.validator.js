const Joi = require("joi");
const {nameValidator, ageValidator, emailValidator, passwordValidator} = require("./common.validator");
module.exports = {
    newUserValidator: Joi.object({
        name: nameValidator.required(),
        age: ageValidator.required(),
        email: emailValidator.required(),
        password: passwordValidator.required(),
    }),

    updatedUserValidator: Joi.object({
        name: nameValidator,
        age: ageValidator,
    })
};
