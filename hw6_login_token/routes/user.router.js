const router = require('express').Router();

const {userController} = require("../controllers");
const {userMiddleware, commonMiddleware, authMiddleware} = require("../middlewares");

router.get('/',
    userController.getAllUsers);
router.post('/',
    userMiddleware.isCreatedUserValid,
    userMiddleware.isUserUnique,
    userController.createNewUser);

router.get('/:id',
    commonMiddleware.isIdValid,
    userMiddleware.isUserExist,
    userController.getUserById);
router.put('/:id',
    commonMiddleware.isIdValid,
    authMiddleware.checkAccessToken, // беремо на всі закриті ендпоінти, на які може переходити лише користувач
    userMiddleware.isUpdatedUserValid,
    userMiddleware.isUserExist,
    userController.updateUserById);
router.delete('/:id',
    commonMiddleware.isIdValid,
    authMiddleware.checkAccessToken, // беремо на всі закриті ендпоінти, на які може переходити лише користувач
    userMiddleware.isUserExist,
    userController.deleteUser);

module.exports = router;
