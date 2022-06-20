const {Types} = require('mongoose');
const {CustomError} = require("../errors");

module.exports = {
    isIdValid: (req, res, next) => {
        try {
            const {id} = req.params;

            const isValid = Types.ObjectId.isValid(id) // метод, що повертає булеве значення
            if (!isValid) {
                return next(new CustomError('Not valid id', 400))
                //передаэмо помилки, і другим аргументом передаємо ту помилку, яка буде валитися.
                // Якщо не передамо, то впаде помилка, яку ми вказали
            }
            next();
        } catch (e) {
            next(e)
        }
    }
};

// commonMiddleware - можуть використовуватися всюди, тому їх треба робити універсальними.
// саме тому ми в роутерах динамічну змінну назвали просто id, це дасть нам змогу
// опрацьовувати всі ід у всіх сутностях, які ми будемо мати в майбутньому
// в мідлвари пхаємо всі можливі перевірки, тобто, всі наші іфки
