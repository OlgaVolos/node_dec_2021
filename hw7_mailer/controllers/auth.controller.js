const {passwordService, authService, emailService} = require("../services");
const {OAuth} = require("../dataBase");
const {emailActionTypesEnum} = require("../enums");
module.exports = {
    login: async (req, res, next) => {
        try {
            const {password: hashPassword, _id} = req.user;
            const {password} = req.body;

            await passwordService.comparePassword(hashPassword, password); // порівнюємо паролі

            const tokens = authService.generateTokens(); // генеруємо токени

            await OAuth.create({
                userId: _id,
                ...tokens
            });

            res.json({
                user: req.user,
                ...tokens
            }) // показуємо юзера і токени, що згенерувалися
        } catch (e) {
            next(e);
        }
    },

    refreshToken: async (req, res, next) => {
        try {
            const {userId, refresh_token} = req.tokenInfo;

            await OAuth.deleteOne({refresh_token}); //стираємо старий токен

            const tokens = authService.generateTokens(); // генеруємо нову пару токенів

            await OAuth.create({userId, ...tokens});

            res.json(tokens);

        } catch (e) {
            next(e);
        }
    },

    logout: async (req, res, next) => {
        try {
            const {access_token, user} = req;
            const {email, name} = user;
            await OAuth.deleteOne({access_token});

            await emailService.sendMail(email, emailActionTypesEnum.LOGOUT, {name, count: 1})

            res.sendStatus(204);
        } catch (e) {
            next(e);
        }
    },

    logoutAllDevices: async (req, res, next) => {
        try {
            const {_id, email, name} = req.user;
            const {deletedCount} = await OAuth.deleteMany({userId: _id});

            await emailService.sendMail(email, emailActionTypesEnum.LOGOUT, {name, count: deletedCount})


            res.sendStatus(204);
        } catch (e) {
            next(e);
        }
    },

    forgotPassword: async (req, res, next) => {
        try {
            const {name, email} = req.user

            await emailService.sendMail(email, emailActionTypesEnum.FORGOT_PASSWORD, {name});

            res.sendStatus(204)
        } catch (e) {
            next(e);
        }
    }
};
