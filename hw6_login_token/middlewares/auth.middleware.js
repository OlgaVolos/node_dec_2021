const {OAuth} = require("../dataBase");
const {CustomError} = require("../errors");
const {authService, userService} = require("../services");
const {authValidator} = require("../validators");
const {tokenTypesEnum} = require("../enums");
const {constants} = require("../configs");

module.exports = {

    checkAccessToken: async (req, res, next) => {
        try {
            const authToken = req.get(constants.AUTHORIZATION); // дивимося, чи є взагалі токен
            // якщо є, нам треба його провалідувати в сервісах
            if (!authToken) {
                return next(new CustomError('No token', 401))
            }
            authService.checkToken(authToken); // перевірка,чи адекватний токен


            const tokenInfo = await OAuth.findOne({access_token: authToken}).populate('userId');// або назвати їх однаково
            // populate('userId') це по суті той самий джойн, який показує, яке поле треба приєднати

            if (!tokenInfo) {
                return next(new CustomError('Token not valid', 401))
            }
            req.access_token = tokenInfo.access_token;
            req.user = tokenInfo.userId; //прокидуємо далі

            next();
        } catch (e) {
            next(e);
        }
    }, // це відноситься до видалення юзера

    checkRefreshToken: async (req, res, next) => {
        try {
            const refresh_token = req.get(constants.AUTHORIZATION);

            if (!refresh_token) {
                return next(new CustomError('No token', 401))
            }
            authService.checkToken(refresh_token, tokenTypesEnum.REFRESH);

            const tokenInfo = await OAuth.findOne({refresh_token});

            if (!tokenInfo) {
                return next(new CustomError('Token not valid', 401))
            }
            req.tokenInfo = tokenInfo; //просто далі кидаємо цю інфу
            next();
        } catch (e) {
            next(e);
        }
    },
    isUserPresentForAuth: async (req, res, next) => {
        try {
            const {email} = req.body;

            const userByEmail = await userService.findOneUser({email});

            if (!userByEmail) {
                return next(new CustomError('Wrong email or password', 404))
            }

            req.user = userByEmail; // до req дописуємо нову філду юзер, в яку записуємо userByEmail
            // і перекидаємо ми його далі в контролер

            next();
        } catch (e) {
            next(e);
        }
    },

    isLoginBodyValid: async (req, res, next) => {
        try {

            const {error, value} = await authValidator.login.validate(req.body);

            if (error) {
                return next(new CustomError('Wrong email or password', 404))
            }

            req.body = value; // до req дописуємо нову філду юзер, в яку записуємо userByEmail
            // і перекидаємо ми його далі в контролер

            next();
        } catch (e) {
            next(e);
        }
    },
}
