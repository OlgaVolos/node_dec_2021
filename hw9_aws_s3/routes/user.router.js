const router = require('express').Router();

const {userController} = require("../controllers");
const {userMiddleware, commonMiddleware, fileMiddleware, authMiddleware} = require("../middlewares");
const {userValidator} = require("../validators");

router.get('/',
    // commonMiddleware.isDateValid(userQueryValidator.findAll, 'query'), // для query, див. 5 дз
    userController.getAll);

router.post('/',
    commonMiddleware.isDateValid(userValidator.newUserValidator),
    fileMiddleware.checkUserAvatar,
    userMiddleware.isUserUnique,
    userController.createUser);

router.get('/:id',
    commonMiddleware.isIdValid,
    userMiddleware.isUserPresent,
    userController.getUserById);

router.put('/:id',
    commonMiddleware.isIdValid,
    authMiddleware.checkAccessToken, // беремо на всі закриті ендпоінти, на які може переходити лише користувач
    fileMiddleware.checkUserAvatar,
    commonMiddleware.isDateValid(userValidator.updatedUserValidator),
    userMiddleware.isUserPresent,
    userController.updateUser);

router.delete('/:id',
    commonMiddleware.isIdValid,
    authMiddleware.checkAccessToken, // беремо на всі закриті ендпоінти, на які може переходити лише користувач
    userMiddleware.isUserPresent,
    userController.deleteUser);

module.exports = router;
