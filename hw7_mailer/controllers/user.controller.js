const {userService, passwordService, emailService} = require("../services");
const {userPresenter} = require("../presenters/user.presenter");
const {emailActionTypesEnum} = require("../enums");

module.exports = {
    getAllUsers: async (req, res, next) => {
        try {
            const users = await userService.findAll().exec();

            const userForResponse = users.map(user => userPresenter(user)) ;

            res.json(userForResponse);

        }catch (e) {
            next(e);
        }
    },

    getUserById: async (req, res, next) => {
        try {
            const {user} = req;

            const userForResponse = userPresenter(user);

            res.json(userForResponse);
        }catch (e) {
            next(e);
        }
    },

    createNewUser: async (req, res, next) => {
        try {
            const { email, password, name } = req.body;
            const hash = await passwordService.hashPassword(password);

            const newUser = await userService.createUser({...req.body, password: hash});

            await emailService.sendMail(email, emailActionTypesEnum.WELCOME, {name})

            const userForResponse = userPresenter(newUser);

            res.status(201).json(userForResponse);
        }catch (e) {
            next();
        }
    },

    updateUser: async (req, res, next) => {
        try {
            const {id} = req.params;

            const updatedUser = await userService.updateUser({_id:id}, req.body);

            const userForResponse = userPresenter(updatedUser);

            res.status(201).json(userForResponse)

        }
        catch (e) {
            next(e);
        }
    },

    deleteUser: async (req, res, next) => {
        try {
            const {id} = req.params;
            await userService.deleteById({_id:id});
            res.sendStatus(204);
        } catch (e) {
            next(e);
        }
    }
};

