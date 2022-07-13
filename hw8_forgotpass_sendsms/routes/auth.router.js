const router = require('express').Router();


const {authMiddleware} = require("../middlewares");
const {authController} = require("../controllers");
const {emailActionTypesEnum} = require("../enums");


router.post('/login',
    authMiddleware.isLoginBodyValid,
    authMiddleware.isUserPresentForAuth,
    authController.login);

router.post('/refresh',
    authMiddleware.checkRefreshToken,
    authController.refreshToken);

router.post('/logout',
    authMiddleware.checkAccessToken,
    authController.logout);

router.post('/logoutAllDevices',
    authMiddleware.checkAccessToken,
    authController.logoutAllDevices);

router.post('/forgotPassword',
    authMiddleware.isEmailValid,
    authMiddleware.isUserPresentForForgotPassword,
    authController.forgotPassword);

router.post('/forgotPassword/set',
    authMiddleware.checkActionToken(emailActionTypesEnum.FORGOT_PASSWORD),
    authController.setForgotPassword);

module.exports = router;
