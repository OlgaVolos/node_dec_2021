const {userService} = require("../services");
const {CustomError} = require("../errors");
const {userValidator} = require("../validators");


module.exports = {
    isUserPresent: async (req, res, next) => {
        try {
            const {id} = req.params;

            const user = await userService.findOneUser({_id: id});

            if (!user) {
                return next(new CustomError('User not found'))
            }
            req.user = user
            next();
        } catch (e) {
            next(e);
        }
    },

    isUserUnique: async (req, res, next) => {
        try {
            const {email} = req.body;

            const user = userService.findOneUser({email});
            if (user) {
                return next(new CustomError(`User with email ${email} is already exist`, 409));
            }
            req.user = user;
            next();
        } catch (e) {
            next(e);
        }
    },

    isCreatedUserValid: async (req, res, next) => {
        try {
            const {error, value} = userValidator.newUserValidator.validate(req.body);
            if (error) {
                return next(new CustomError(error.details[0].message));
            }
            req.body = value;
            next()
        } catch (e) {
            next(e);
        }
    },
    isUpdatedUserValid: async (req, res, next) => {
        try {
            const {error, value} = userValidator.updatedUserValidator.validate(req.body);
            if (error) {
                return next(new CustomError(error.details[0].message));
            }
            req.body = value;
            next();
        } catch (e) {
            next(e);
        }
    }
};





