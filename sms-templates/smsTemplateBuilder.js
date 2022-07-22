const {smsActionTypesEnum} = require("../enums");

module.exports = {
    [smsActionTypesEnum.WELCOME]: (name) => {
        return `Hi ${name}, welcome on our platform`;
    },
}
