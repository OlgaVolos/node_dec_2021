const {passwordService, authService, emailService} = require("../services");
const {OAuth, ActionToken, User} = require("../dataBase");
const {emailActionTypesEnum} = require("../enums");

module.exports = {
    login: async (req, res, next) => {
        try {
            const {password: hashPassword, _id} = req.user; //витягаэмо захешований пароль з юзера, що логіниться
            const {password} = req.body; // витягаємо пароль, який приходить з боді

            await passwordService.comparePassword(hashPassword, password) //перевіряємо, чи співпадають паролі

            // await req.user.comparePasswords(password); // UserSchema.methods

            const tokens = authService.generateTokens(); // генеруємо токени

            await OAuth.create({
                userId: _id,
                ...tokens
            });

            res.json({
                user: req.user,
                ...tokens
            })
        } catch (e) {
            next(e);
        }
    },

    refreshToken: async (req, res, next) => {
        try {
            const {userId, refresh_token} = req.tokenInfo;
            await OAuth.deleteOne({refresh_token});

            const tokens = authService.generateTokens();

            await OAuth.create({userId, ...tokens});

            res.json(tokens);
        } catch (e) {
            next(e);
        }
    },

    logout: async (req, res, next) => {
        try {
            const {access_token, user} = req;
            const {email, name} = user;

            await OAuth.deleteOne({access_token});
            await emailService.sendMail(email, emailActionTypesEnum.LOGOUT, {name});

            res.sendStatus(204);

        } catch (e) {
            next(e);
        }
    },

    logoutAllDevices: async (req, res, next) => {
        try {
            const {_id, email, name} = req.user;

            const {deleteCount} = await OAuth.deleteMany({userId: _id});

            await emailService.sendMail(email, emailActionTypesEnum.LOGOUT, {name, count: deleteCount});


            res.sendStatus(204);

        } catch (e) {
            next(e);
        }
    },

    // forgotPassword: async (req, res, next) => {
    //     try {
    //         const {name, email} = req.user; //бо ми його передали через мідлвару
    //
    //         await emailService.sendMail(email, emailActionTypesEnum.FORGOT_PASSWORD, {name})
    //
    //         res.sendStatus(204);
    //     } catch (e) {
    //         next(e);
    //     }
    // },

    forgotPassword: async (req, res, next) => {
        try {
            const {_id, name, email} = req.user; //бо ми його передали через мідлвару

            const token = authService.generateActionToken(emailActionTypesEnum.FORGOT_PASSWORD, {name, _id})

            await ActionToken.create({
                userId: _id,
                token,
                actionType: emailActionTypesEnum.FORGOT_PASSWORD
            })

            await emailService.sendMail(email,
                emailActionTypesEnum.FORGOT_PASSWORD,
                {name, token})

            res.json(token);

        } catch (e) {
            next(e);
        }
    },

    setForgotPassword: async (req, res, next) => {
        try {
            const {_id} = req.user; //бо ми його передали через мідлвару
            const {password} = req.body;

            const hash = await passwordService.hashPassword(password);
            const updatedUser = await User.findByIdAndUpdate(_id, {password: hash}, {new: true}); //{new: true} повернути оновлений варіант

            await ActionToken.deleteOne({actionType: emailActionTypesEnum.FORGOT_PASSWORD, userId: _id})

            res.json(updatedUser)
        } catch (e) {
            next(e);
        }
    },
};


