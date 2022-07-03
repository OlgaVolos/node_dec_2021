const router = require('express').Router();

const {userController} = require("../controllers");
const {userMiddleware, commonMiddleware} = require("../middllewares");

router.get('/',
    userController.getAllUsers);

router.post('/',
    userMiddleware.isCreatedUserValid,
    userMiddleware.isUserUnique,
    userController.createNewUser);


router.get('/:id',
    commonMiddleware.isIdValid,
    userMiddleware.isUserPresent,
    userController.getUserById);

router.put('/:id',
    commonMiddleware.isIdValid,
    userMiddleware.isUpdatedUserValid,
    userMiddleware.isUserPresent,
    userController.updateUser);

router.delete('/:id',
    commonMiddleware.isIdValid,
    userMiddleware.isUserPresent,
    userController.deleteUser);

module.exports = router;
