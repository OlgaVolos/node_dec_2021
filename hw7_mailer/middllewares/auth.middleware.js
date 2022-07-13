const {authValidator} = require("../validators");
const {authService, userService} = require("../services");
const {constants} = require("../configs");
const {CustomError} = require("../errors");
const {OAuth} = require("../dataBase");
const {tokenTypesEnum} = require("../enums");


module.exports = {

    checkAccessToken: async (req, res, next) => {
        try {
            const authToken = req.get(constants.AUTHORIZATION);
            if (!authToken) {
                return next(new CustomError('No token', 401))
            }
            authService.checkToken(authToken); // перевірка,чи адекватний токен

            const tokenInfo = await OAuth.findOne({access_token: authToken}).populate('userId') //поєднує з відповідною базою

            if (!tokenInfo) {
                return next(new CustomError('Token not valid', 401))
            }
            req.access_token = tokenInfo.access_token;
            req.user = tokenInfo.userId; //прокидуємо далі, в контроллері будемо ловити
            next();
        } catch (e) {
            next(e);
        }
    },

    checkRefreshToken: async (req, res, next) => {
        try {
            const refresh_token = req.get(constants.AUTHORIZATION);

            if (!refresh_token) {
                return next(new CustomError('No token', 401))
            }
            authService.checkToken(refresh_token, tokenTypesEnum.REFRESH) // тут порівнюємо, чи співпадає, бо за замочуванням нам приходить 'access'

            const tokenInfo = await OAuth.findOne({refresh_token});
            if (!tokenInfo) {
                return next(new CustomError('Token not valid', 401))
            }
            req.tokenInfo = tokenInfo;
            next();
        } catch (e) {
            next(e);
        }
    },

    isUserPresentForAuth: async (req, res, next) => {
        try {
            const {email} = req.body;

            const user = await userService.findOneUser({email});

            if(!user){
                return next(new CustomError('Wrong email or password', 404))
            }
            req.user = user;

            next();
        }catch (e) {
            next(e);
        }
    },

    isLoginBodyValid: async (req, res, next) => {
        try {
            const {error, value} = await authValidator.login.validate(req.body);

            if(error){
                return next(new CustomError('Wrong email or password', 404))
            }

            req.body = value;

            next();
        }catch (e) {
            next(e);
        }
    },
    isEmailValid: async (req, res, next) => {
        try {
            const {error, value} = await authValidator.forgotPassword.validate(req.body);

            if(error){
                return next(new CustomError('Wrong email', 404))
            }

            req.body = value;

            next();
        }catch (e) {
            next(e);
        }
    },
    isUserPresentForForgotPassword: async (req, res, next) => {
        try {
            const {email} = req.body;

            const user = await userService.findOneUser({email});

            if(!user){
                return next(new CustomError('Wrong email', 404))
            }
            req.user = user;

            next();
        }catch (e) {
            next(e);
        }
    },

};
