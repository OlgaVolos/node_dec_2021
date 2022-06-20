const {User} = require("../dataBase");

const getAllUsers = (params = {}) => {
   return  User.find(params);
}; // params = {} - це означає, що, якщо нічого не передаємо, то буде порожній об"єкт
// це би мав бути асинхронний код, але, оскільки маємо return, то контроллер буде чекати
//на виконання цього коду

const findOneUser = (params = {}) => {
    return User.findOne(params);

};

const createUser = (user) => {
    return User.create(user);
};

const updateUser = (params, userData, options={new:true}) => {
    return User.findOneAndUpdate(params, userData, options);
};
// params - по чому фільтруємо;
// userData - те, що хочемо оновити;
// options - дозволяє отримати оновлені дані

const deleteUserById = (params) => {
return User.deleteOne(params);
};

module.exports = {
    createUser,
    deleteUserById,
    findOneUser,
    getAllUsers,
    updateUser
}
