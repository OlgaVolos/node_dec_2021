const jsonwebtoken = require('jsonwebtoken');
const {config} = require("../configs");
const {tokenTypesEnum} = require("../enums");
const {CustomError} = require("../errors");

module.exports = {
    generateTokens: (payload = {}) => {
        const access_token = jsonwebtoken.sign(payload, config.ACCESS_TOKEN_SECRET, {expiresIn: '15m'});
        const refresh_token = jsonwebtoken.sign(payload, config.REFRESH_TOKEN_SECRET, {expiresIn: '30d'});

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

            return jsonwebtoken.verify(token, secret);

        } catch (e) {
            throw new CustomError('Token not valid', 401)
        }
    }
}
