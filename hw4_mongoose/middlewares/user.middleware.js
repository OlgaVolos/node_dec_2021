const {userService} = require("../services");
const {CustomError} = require("../errors");


module.exports = {
    isUserExist: async (req, res, next) => {
        try {
            const {id} = req.params;

            const user = await userService.findOneUser({_id: id})
            if (!user) {
                return next(new CustomError('User not found'))
                //помилка дефолтна, тому її тут не вказуємо
                //другим аргументом
            }
            // якщо користувача знайшли, то його ми можливо будемо використовувати десь далі
            // і щоб в наступних мідлварах,чи контролерах не робити новий запит
            // за цими ж даними, ми розширимо наш req
            req.user = user; // якщо тут розширити req, тобто, ми створили змінну, то в наступній мідлварі вони
            //передадуться
            next()

        } catch (e) {
            next(e);
        }
    },

    isUserValidForCreate: async (req, res, next) => {
        try {
            const {name, email, password, age} = req.body;

            if (!age || !Number.isInteger(age) || age < 18) {
                return next(new CustomError('Set valid age'));
            }

            if (!name || name.length < 2) {
                return next(new CustomError('Set valid name'));
            }

            if (!password || password.length < 6) {
                return next(new CustomError('Set valid password'));
            }

            if (!email || !email.includes('@')) {
                return next(new CustomError('Set valid email'));
            }

            next();

        } catch (e) {
            next(e);
        }
    },

    isUserValidForUpdate: async (req, res, next) => {
        try {
            const {name, age} = req.body;

            if (name && name.length < 2) {
                return next(new CustomError('Set valid name'))
            }

            if (age && !Number.isInteger(age) || age < 18) {
                return next(new CustomError('Set valid age'))
            }

            req.dateForUpdate = {name, age}; // що би не прокидалося в запиті, будуть оновлюватися лише вказані тут поля
            next();
        } catch (e) {
            next(e);
        }
    },

    isUserUnique: async (req, res, next) => {
        try {
            const {email} = req.body;

            const user = await userService.findOneUser({email});
            if (user) {
                return next(new CustomError(`User with email ${email} is exist`, 409))
            }

            req.user = user
            next();
        } catch (e) {
            next(e);

        }
    }
};

//мідлвари, що стосються лише юзера
