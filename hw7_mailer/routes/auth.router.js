const {authMiddleware} = require("../middllewares");
const {authController} = require("../controllers");
const router = require('express').Router();

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

module.exports = router;
