const {userService} = require("../services");
const {userPresenter} = require("../presenters/user.presenter");
module.exports = {
    getAllUsers: async (req, res, next) => {
        try {
            const users = await userService.findAll().exec(); //перетворює монго-об"єкт в звичайний масив, без нього не мапнемо

            const userForResponse = users.map(u => userPresenter(u));

            res.json(userForResponse);

        } catch (e) {
            next(e);
        }
    },

    getUserById: async (req, res, next) => {
        try{

            const {user} = req;

            const userForResponse = userPresenter(user);

            res.json(userForResponse);
        }catch (e) {
            next(e);
        }
    }, //TODO: запитати про сервіс

    createNewUser: async (req, res, next) => {
        try {
            const {email, password, name} = req.body;

            const newUser = await userService.createUser({...req.body});

            const userForResponse = userPresenter(newUser);

            res.status(201).json(userForResponse);
        }catch (e) {
            next(e);
        }
    },

    updateUser: async (req, res, next) => {
        try{
            const {id} = req.params;

            const updatedUser = await userService.updateUser({_id: id}, req.body);

            const userForResponse = userPresenter(updatedUser);

            res.status(201).json(userForResponse);
        }catch (e) {
            next(e);
        }
    },

    deleteUser: async (req, res, next) => {
        try {
            const {id} = req.params;

            await userService.deleteUserById({_id: id});

            res.sendStatus(204);
        }catch (e) {
            next(e);
        }
    }
};
