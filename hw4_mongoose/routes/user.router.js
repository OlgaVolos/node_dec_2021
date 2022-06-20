const router = require('express').Router();

const {userController} = require("../controllers");
const {commonMiddleware, userMiddleware} = require("../middlewares");


router.get('/',
    userController.getAllUsers);
router.post('/',
    userMiddleware.isUserValidForCreate,
    userMiddleware.isUserUnique,
    userController.createUser);

router.get('/:id',
    commonMiddleware.isIdValid,
    userMiddleware.isUserExist,
    userController.getUserById);
router.put('/:id',
    commonMiddleware.isIdValid,
    userMiddleware.isUserValidForUpdate,
    userMiddleware.isUserExist,
    userController.updateUserById);
router.delete('/:id',
    commonMiddleware.isIdValid,
    userMiddleware.isUserExist,
    userController.deleteUserById);

module.exports = router;

// всі валідації, що ми робимо без запитів, ми робимо раніше
