const jwt = require('jsonwebtoken');
const {CustomError} = require("../errors");
const {config} = require("../configs");
const {tokenTypesEnum} = require("../enums"); // інсталимо бібліотеку з npm

module.exports = {
    generateAuthToken: (payload = {}) => {
        const access_token = jwt.sign(payload, config.ACCESS_TOKEN_SECRET, {expiresIn: '15m'}); // час, скільки живе токен
        const refresh_token = jwt.sign(payload, config.REFRESH_TOKEN_SECRET, {expiresIn: '30d'}); // час, скільки живе
        // секретне слово формується спеціальним словом. Для access_token і refresh_token різні слова.
        // їх треб запихати в конфіги, або в константи
        return {
            access_token,
            refresh_token
        }
    },
    checkToken: (token = '', tokenType = tokenTypesEnum.ACCESS) => {
        try {
            let secret;

            if(tokenType === tokenTypesEnum.ACCESS) secret = config.ACCESS_TOKEN_SECRET;
            if(tokenType === tokenTypesEnum.REFRESH) secret = config.REFRESH_TOKEN_SECRET;


            return jwt.verify(token, secret);
        } catch (e) {
            throw new CustomError('Token not valid', 401);
        }
    } // сервыси зазвичай в трай-кетч не огортаються, але тут треба, бо потрібно вернути правильну помилку
};




