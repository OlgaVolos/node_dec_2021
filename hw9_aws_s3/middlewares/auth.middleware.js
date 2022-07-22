const {constants} = require("../configs");
const {CustomError} = require("../errors");
const {authService, userService} = require("../services");
const {OAuth, ActionToken} = require("../dataBase");
const {tokenTypesEnum} = require("../enums");
const {authValidator} = require("../validators");
module.exports = {
    checkAccessToken: async (req, res, next) => {
        try{
            const access_token = req.get(constants.AUTHORIZATION);
            if(!access_token){
                return next(new CustomError('No token', 401))
            }

            authService.checkToken(access_token);
            const tokenInfo = await OAuth.findOne({access_token}).populate('userId');

            if(!tokenInfo){
                return next(new CustomError('Token not valid', 401))
            }
            req.access_token = tokenInfo.access_token;
            req.user = tokenInfo.userId;
            next();
        }catch (e) {
            next(e);
        }
    },

    checkRefreshToken: async (req, res, next) => {
        try {
            const refresh_token = req.get(constants.AUTHORIZATION);
            if(!refresh_token){
                return next(new CustomError('No token', 401))
            }
            authService.checkToken(refresh_token, tokenTypesEnum.REFRESH);

            const tokenInfo = await OAuth.findOne({refresh_token});
            if(!tokenInfo){
                return next(new CustomError('Token not valid', 401))
            }
            req.tokenInfo = tokenInfo;

            next();
        }catch (e) {
            next(e);
        }
    },

    checkActionToken: (actionType) => async (req, res, next) => {
        try {
            const action_token = req.get(constants.AUTHORIZATION);

            if(!action_token){
                return next(new CustomError('No token', 401))
            }

            authService.checkActionToken(action_token, actionType);

            const tokenInfo = await ActionToken.findOne({token: action_token}).populate('userId');
            if(!tokenInfo){
                return next(new CustomError('Token not valid', 401))
            }

            req.user = tokenInfo.userId;


            next();
        }catch (e) {
            next(e);
        }
    }, // це унівурсальна супер-мідлвара замість двох перших

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
        } catch (e) {
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
