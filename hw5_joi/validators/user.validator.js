const Joi = require('joi');

const {emailValidator, passwordValidator} = require("./common.validator");

const userSubScheme = {
    name: Joi.string().alphanum().min(2).max(100),
    age: Joi.number().integer().min(1).max(130),

}

module.exports = {
    newUserValidator: Joi.object({
        // ...userSubScheme, //тягнемо поля, якщо повторюються, і якщо потрібно
        name: Joi.string().alphanum().min(2).max(100).required(),
        email: emailValidator.required(),
        age: Joi.number().integer().min(1).max(130),
        password: passwordValidator.required()

    }), // email не рекомендовано валідувати email(), щоб не було конфліктів з фронтом


    updateUserValidator: Joi.object(userSubScheme), // на апдейт ми не посилаємо емейл і пасворд, також нейм не є обов"язковим полем

    // можна валідувати будь-що, наприклад масиви
    // testValidator: Joi.object({
    //     // array: Joi.array().items(Joi.string(), Joi.number()) // масив стрічок і чисел
    //     isAdult: Joi.boolean(),
    // array: Joi.array().items(userSubScheme).when('isAdult', {is: true, then: Joi.required()})
    // }) // типу іф-елс


} // те, що повторюється, можна виносити в окремі сабзмінні
