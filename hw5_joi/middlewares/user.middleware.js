const {CustomError} = require("../errors");
const {userService} = require("../services");
const {userValidator, userQueryValidator} = require("../validators");


module.exports = {
    isCreatedUserValid: async (req, res, next) => {
        try {
            const {error, value} = userValidator.newUserValidator.validate(req.body);
            if (error) {
                return next(new CustomError(error.details[0].message));
                // throw new CustomError(error.details[0].message); // можна так кидати помилку
            }
            req.body = value;

            next()
        } catch (e) {
            next(e);
        }
    },
    // isCreateUserValid: async (req, res, next) => {
    //     try {
    //         const {name, email, password, age} = req.body;
    //
    //         if (!age || !Number.isInteger(age) || age < 18) {
    //             return next(new CustomError('Set valid age'))
    //         }
    //         if (!name || name.length < 2) {
    //             return next(new CustomError('Set valid name'))
    //         }
    //         if (!password || password.length < 6) {
    //             return next(new CustomError('Set valid password'))
    //         }
    //         if (!email || email.includes('@')) {
    //             return next(new CustomError('Set valid email'))
    //         }
    //
    //         next();
    //
    //     } catch (e) {
    //         next(e);
    //     }
    // }, //цього нам вже не треба, бо валідацію пройшли в user.validator і описали вище

    isUpdateUserValid: async (req, res, next) => {
        try {
            const {error, value} = userValidator.updateUserValidator.validate(req.body);
            if (error) {
                return next(new CustomError(error.details[0].message));
                // throw new CustomError(error.details[0].message); // можна так кидати помилку
            }
            req.body = value;

            next()
        } catch (e) {
            next(e);
        }
    },


    isUserPresent: async (req, res, next) => {
        try {
            const {id} = req.params;

            const user = await userService.findOne({_id: id});
            if (!user) {
                return next(new CustomError('User not found'));
            }
            req.user = user;
            next();
        } catch (e) {
            next(e);
        }
    },

    isUserUnique: async (req, res, next) => {
        try {
            const {email} = req.body;

            const user = await userService.findOne({email});

            if (user) {
                return next(new CustomError(`User with email ${email} already exist`, 409))
            }

            req.user = user;
            next();
        } catch (e) {
            next(e)
        }
    }, // перевірка, чи не повторюється мейл

    isUserQueryValid: async (req, res, next) => {
        try {
            const {error, value} = userQueryValidator.findAll.validate(req.query);
            if (error) {
                return next(new CustomError(error.details[0].message));
                // throw new CustomError(error.details[0].message); // можна так кидати помилку
            }
            req.query = value;

            next()
        } catch (e) {
            next(e);
        }
    }, // мідлвара для пошуку за квері-параметрами




}
