const Joi = require('joi');
const {EMAIL_REGEX, PASSWORD_REGEX} = require("../configs/constants");

module.exports = {
    emailValidator: Joi.string().regex(EMAIL_REGEX).lowercase().trim(), //стрінга, регулярка і приведення до малого регістру
    passwordValidator: Joi.string().regex(PASSWORD_REGEX)
};

// якшо повторюються, то виносимо в змінні, але вони тут не можуть бути required
// також можна виносити частини
