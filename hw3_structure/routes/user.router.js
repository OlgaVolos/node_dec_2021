const router = require('express').Router();

const {userController} = require("../controllers");

router.get('/', userController.getAllUsers);
router.post('/', userController.createUser);

router.get('/:userId', userController.getUserById);
router.delete('/:userId', userController.deleteUserById);
router.put('/:userId', userController.updateUser);

module.exports = router;
