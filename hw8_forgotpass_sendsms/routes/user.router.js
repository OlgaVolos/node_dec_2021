const router = require('express').Router();

const {commonMiddleware, userMiddleware} = require("../middlewares");
const {userControllers} = require("../controllers");

router.get('/',
    userControllers.getAllUsers);

router.post('/',
    userMiddleware.isCreatedUserValid,
    userMiddleware.isUserUnique,
    userControllers.createNewUser);


router.get('/:id',
    commonMiddleware.isIdValid,
    userMiddleware.isUserPresent,
    userControllers.getUserById);

router.put('/:id',
    commonMiddleware.isIdValid,
    userMiddleware.isUpdatedUserValid,
    userMiddleware.isUserPresent,
    userControllers.updateUser);

router.delete('/:id',
    commonMiddleware.isIdValid,
    userMiddleware.isUserPresent,
    userControllers.deleteUser);

module.exports = router;
