const {authService, passwordService} = require("../services");
const {OAuth} = require("../dataBase");

module.exports = {
    login: async (req, res, next) => {
        try {
            const {password: hashPassword, _id} = req.user; // передаэмо з юзера захешований пароь
            const {password} = req.body; // нам приходить з боді звичайний пароль

            await passwordService.comparePassword(hashPassword, password); // перевірить захешований і простий пароль

            const tokens = authService.generateAuthToken(); // генеруємо токени

            await OAuth.create({
                userId: _id,
                ...tokens
            })

            res.json({
                user: req.user,
                ...tokens
            }) // віддаємо їх назад і заодно показуємо юзера, який залогінився
        } catch (e) {
            next(e);
        }
    },

    refreshToken: async (req, res, next) => {
        try {
            const {userId, refresh_token} = req.tokenInfo;

            await OAuth.deleteOne({refresh_token})

            const tokens = authService.generateAuthToken();

            await OAuth.create({userId, ...tokens})

            res.json(tokens)

        } catch (e) {
            next(e);
        }
    },

    logoutOneDevice: async (req, res, next) => {
        try{
            const {access_token} = req;
            await OAuth.deleteOne({access_token});

            res.sendStatus(204);

        }catch (e) {
            next(e);
        }
    },
    logoutAllDevices: async (req, res, next) => {
        try{
            const {_id} = req.user;
            await OAuth.deleteMany({userId:_id});

            res.sendStatus(204);

        }catch (e) {
            next(e);
        }
    },

}
