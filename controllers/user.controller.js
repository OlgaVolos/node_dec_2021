const {userService, passwordService, emailService, smsService, s3Service} = require("../services");
const {userPresenter} = require("../presenters/user.presenter"); // це фуункція, тому такий імпорт
const {smsTemplateBuilder} = require("../sms-templates");
const {smsActionTypesEnum, emailActionTypesEnum} = require("../enums");
const {uploadFile} = require("../services/s3.service");
const {User} = require("../dataBase"); // це фуункція, тому такий імпорт

module.exports = {
    getAll: async (req, res, next) => {
        try {
            const users = await userService.getAllWithPagination(req.query).exec();

            const userForResponse = users.map(u => userPresenter(u));

            res.json(userForResponse);

        } catch (e) {
            next(e);
        }
    },

    getUserById: async (req, res, next) => {
        try {
            const {user} = req;

            const userForResponse = userPresenter(user);

            res.json(userForResponse);

        } catch (e) {
            next(e);
        }
    },

    createUser: async (req, res, next) => {
        try {
            const {name, email, password, phone} = req.body;

            const hash = await passwordService.hashPassword(password);

            const user = await userService.createUser({...req.body, password: hash});

            const {Location} = await uploadFile(req.files.avatar, 'user', user._id);

            const userWithPhoto = await User.findByIdAndUpdate({_id: user._id}, {avatar: Location}, {new: true});

            const sms = smsTemplateBuilder[smsActionTypesEnum.WELCOME](name); //витягаємо з темплейтів

            await Promise.allSettled([
            smsService.sendSms(phone, sms),
            emailService.sendMail(email, emailActionTypesEnum.WELCOME, {name}),
            ]); //надсилання не впливають одне на одного, не пов"язані одне з одним,
            // тому ми їх можемо зробити одночасно

            const userForResponse = userPresenter(userWithPhoto);

            res.status(201).json(userForResponse);
        } catch (e) {
            next(e);
        }
    },

    updateUser: async (req, res, next) => {
        try {
            const {id} = req.params;
            if (req.files?.avatar) {
                if (req.user.avatar) {
                    const {Location} = await s3Service.uploadFile(req.files.avatar, 'user', id);
                    req.body.avatar = Location;
                } else {
                    const {Location} = await s3Service.updateFile(req.files.avatar, req.user.avatar); //req.files.avatar - новий файл, що приходить; req.user.avatar - шлях до нього
                    req.body.avatar = Location;
                }
            }


            const updatedUser = await userService.updateUser({_id: id}, req.body);

            const userForResponse = userPresenter(updatedUser);

            res.status(201).json(userForResponse);

        } catch (e) {
            next(e);
        }
    },

    deleteUser: async (req, res, next) => {
        try {
            const {id} = req.params;

            await userService.deleteUser({_id: id});

            if(req.user.avatar){
            await s3Service.deleteFile(req.user.avatar); // юзер міг взагалі не загружати аватар, тому ми перевіряємо, чи він там взагалі був
            }

            res.sendStatus(204);
        } catch (e) {
            next(e);
        }
    }
};
