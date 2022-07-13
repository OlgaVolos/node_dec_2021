const {userService, passwordService, emailService, smsService} = require("../services");
const {userPresenter} = require("../presenters/user.presenter");
const {emailActionTypesEnum, smsActionTypesEnum} = require("../enums");
const {smsTemplateBuilder} = require("../sms-templates");

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
    },

    createNewUser: async (req, res, next) => {
        try {
            const {email, password, name, phone} = req.body;

            const hash = await passwordService.hashPassword(password);

            const newUser = await userService.createUser({...req.body, password: hash});

            // const newUser = await userService.createWithHashPassword(req.body); // UserSchema.statics, тоді самого hash нам не треба

            const sms = smsTemplateBuilder[smsActionTypesEnum.WELCOME](name);

            await smsService.sendSMS(phone, sms)
            await emailService.sendMail(email, emailActionTypesEnum.WELCOME, {name});

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
