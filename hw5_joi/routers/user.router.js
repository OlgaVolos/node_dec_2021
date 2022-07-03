const router = require('express').Router();

const {userController} = require("../controllers");
const {userMiddleware, commonMiddleware} = require("../middlewares");

router.get('/',
    userController.getAllUsers);

// router.get('/',
//     userMiddleware.isUserQueryValid,
//     userController.getAllUsers); // шукаємо за query-параметром

router.post('/',
    userMiddleware.isCreatedUserValid,
    userMiddleware.isUserUnique,
    userController.createUser);

router.get('/:id',
    commonMiddleware.isIdValid,
    userMiddleware.isUserPresent,
    userController.getUserById);
router.put('/:id',
    commonMiddleware.isIdValid,
    userMiddleware.isUpdateUserValid,
    userMiddleware.isUserPresent,
    userController.updateUserById);
router.delete('/:id',
    commonMiddleware.isIdValid,
    userMiddleware.isUserPresent,
    userController.deleteUserById);




module.exports = router;

