const userRouter = require('express').Router();

const {userController} = require("../controllers");
const {commonMiddleware, userMiddleware} = require("../middlewares");


userRouter.get('/',
    userController.getAllUsers);
userRouter.post('/',
    userMiddleware.isUserValidForCreate,
    userMiddleware.isUserUnique,
    userController.createUser);

userRouter.get('/:id',
    commonMiddleware.isIdValid,
    userMiddleware.isUserExist,
    userController.getUserById);
userRouter.put('/:id',
    commonMiddleware.isIdValid,
    userMiddleware.isUserValidForUpdate,
    userMiddleware.isUserExist,
    userController.updateUserById);
userRouter.delete('/:id',
    commonMiddleware.isIdValid,
    userMiddleware.isUserExist,
    userController.deleteUserById);

module.exports = userRouter;

// всі валідації, що ми робимо без запитів, ми робимо раніше
