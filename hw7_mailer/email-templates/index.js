const {emailActionTypesEnum} = require("../enums");
module.exports = {
    [emailActionTypesEnum.WELCOME]: {
        subject: 'Welcome on board',
        template: 'welcome'
    },

    [emailActionTypesEnum.FORGOT_PASSWORD]: {
        subject: 'Ops, looks like you forgot password',
        template: 'forgot-password'
    },

    [emailActionTypesEnum.USER_BANNED]: {
        subject: 'Account was blocked',
        template: 'account-blocked'
    },
    [emailActionTypesEnum.LOGOUT]: {
        subject: 'User was logout',
        template: 'logout'
    },
}
