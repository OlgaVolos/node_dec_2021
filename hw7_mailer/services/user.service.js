const {User} = require("../dataBase");


module.exports = {
    findAll: (params = {}) => {
        return User.find(params);
    },
    findOneUser: (params = {}) => {
        return User.findOne(params);
    },
    createUser: (user) => {
        return User.create(user);
    },
    updateUser: (params, userData, options = {new:true}) => {
        return User.findOneAndUpdate(params, userData, options);
    },
    deleteById: (params) => {
        return User.deleteOne(params);
    },
};

