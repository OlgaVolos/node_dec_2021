const {userService, passwordService} = require("../services");
const {userPresenter} = require("../presenters/user.presenter");


module.exports = {
    getAllUsers: async (req, res, next) => {
        try {
            const users = await userService.findAll().exec(); // exec перетворить респонс, що повертається в об"єкт.
            // Якщо це масив, то він стане нормальним масивом, а не монго-масивом
                const userForResponse = users.map(u => userPresenter(u));
                res.json(userForResponse);

            res.json(users);
        } catch (e) {
            next(e);
        }
    },
    // getAllUsers: async (req, res, next) => {
    //     try {
    //         const users = await userService.findAll(req.query).exec(); // exec перетворить респонс, що повертається в об"єкт.
    //         // Якщо це масив, то він стане нормальним масивом, а не монго-масивом
    //         const userForResponse = users.map(u => userPresenter(u));
    //         res.json(userForResponse);
    //     } catch (e) {
    //         next(e);
    //     }
    // }, // якщо шукаємо за query

    getUserById: async (req, res, next) => {
        try {
            const {user} = req;
            const userResponse = userPresenter(user);
            res.json(userResponse); // повернеться користувач з тими полями, які ми задали
        } catch (e) {
            next(e);
        }
    },

    createUser: async (req, res, next) => {
        try {
            const hash = await passwordService.hashPassword(req.body.password);
            const newUser = await userService.createUser({...req.body, password: hash}); //яке поле далі, те й має більшу вагу і перезатирає попереднє.
            const userResponse = userPresenter(newUser);

            res.status(201).json(userResponse);
        } catch (e) {
            next(e);
        }
    }, // пароль має хешуватися, перетиратися і повертатися

    updateUserById: async (req, res, next) => {
        try {
            const {id} = req.params;

            const updatedUser = await userService.updateUser({_id: id}, req.body);

            const userResponse = userPresenter(updatedUser);


            res.status(201).json(userResponse);
        } catch (e) {
            next(e);
        }
    },

    deleteUserById: async (req, res, next) => {
        try {
            const {id} = req.params;
            await userService.deleteUserById({_id: id});

            res.sendStatus(204);
        } catch (e) {
            next(e);
        }
    } // ід валідувати не треба в джоі, її валідує сам мангус
}

// всі запити в базу ми робимо в сервісах!!! Сюди їх підтягуємо



