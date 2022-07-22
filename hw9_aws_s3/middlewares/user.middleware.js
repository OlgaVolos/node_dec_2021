const {userService} = require("../services");
const {CustomError} = require("../errors");

module.exports = {
    isUserPresent: async (req, res, next) => {
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

            const userByEmail = await userService.findOneUser({email});
            if (userByEmail) {
                return next(new CustomError(`User with email ${email} is already exist`, 409));
            }
            req.user = userByEmail;
            next();
        } catch (e) {
            next(e);
        }
    },
};
