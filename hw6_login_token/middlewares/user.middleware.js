const {userValidator} = require("../validators");
const {CustomError} = require("../errors");
const {userService} = require("../services");


module.exports = {
    isUserExist: async (req, rs, next) => {
        try {
            const {id} = req.params;

            const user = await userService.findOneUser({_id: id});
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

            const user = await userService.findOneUser({email});
            if (user) {
                return next(new CustomError(`User with email ${email} already exist`, 409))
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

            next();
        } catch (e) {
            next(e);
        }
    },

    isUpdatedUserValid: async (req, res, next) => {
        try {
            const {error, value} = userValidator.updateUserValidator.validate(req.body);
            if (error) {
                return next(new CustomError(error.details[0].message));
            }
            req.body = value;

            next();
        } catch (e) {
            next(e);
        }
    }
}
