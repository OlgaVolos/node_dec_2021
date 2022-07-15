const jwt = require('jsonwebtoken');

const {config} = require("../configs");
const {tokenTypesEnum, emailActionTypesEnum} = require("../enums");
const {CustomError} = require("../errors");

module.exports = {
    generateTokens: (payload = {}) => {
        const access_token = jwt.sign(payload, config.ACCESS_TOKEN_SECRET, {expiresIn: '15m'});
        const refresh_token = jwt.sign(payload, config.REFRESH_TOKEN_SECRET, {expiresIn: '30d'});
        return {
            access_token,
            refresh_token
        }
    },

    checkToken: (token = '', tokenType = tokenTypesEnum.ACCESS) => {
        try {
            let secret;

            if (tokenType === tokenTypesEnum.ACCESS) secret = config.ACCESS_TOKEN_SECRET;
            if (tokenType === tokenTypesEnum.REFRESH) secret = config.REFRESH_TOKEN_SECRET;

            return jwt.verify(token, secret);
        } catch (e) {
            throw new CustomError('Token not valid', 401)
        }
    },


    generateActionToken: (actionType, payload = {}) => {
        let secret = '';
        let expiresIn = '7d';
        switch (actionType){
            case emailActionTypesEnum.FORGOT_PASSWORD:
                secret = config.FORGOT_PASS_ACTION_SECRET;
                break

            default:
                throw new CustomError('Token action type', 500)
        }

        return jwt.sign(payload, secret, {expiresIn});

    },

    checkActionToken: (token = '', actionType) => {
        let secret = '';

        switch (actionType){
            case emailActionTypesEnum.FORGOT_PASSWORD:
                secret = config.FORGOT_PASS_ACTION_SECRET;
                break

            default:
                throw new CustomError('Token action type', 500)
        }

        return jwt.sign(token, secret);
    },
}
