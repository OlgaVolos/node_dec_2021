const bcrypt = require('bcrypt');

module.exports = {
    hashPassword: (password) => bcrypt.hash(password, 10), //salt - це ступінь захисту або те, скільки паролів хешується за секунду
    comparePassword: (hashPassword, password) => bcrypt.compare(password, hashPassword) //порівнює паролі введений користувачем і переписує на захешований
}

//підключаємо в контроллерах
