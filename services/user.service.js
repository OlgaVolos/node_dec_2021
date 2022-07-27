const {User} = require("../dataBase");

module.exports = {
    findAll: (params = {}) => {
        return User.find(params);
    },
    getAllWithPagination: async (query = {}) => {

        const {page=1, perPage = 5, ...otherFilters} = query;

        // perPage скільки ітемів на сторінку

        const filterQuery = _getUserFilterQuery(otherFilters);

        const skip = (page-1) * perPage; // 0 на першій сторінці

        const users = await User.find(filterQuery).skip(skip).limit(perPage);
        const userCount = await User.countDocuments(filterQuery);

        return {
            page,
            perPage,
            data: users,
            count: userCount
        }
    },

    findOneUser: (params = {}) => {
        return User.findOne(params);
    },
    createUser: (user) => {
        return User.create(user);
    },
    updateUser: (params, userData, options = {new: true}) => {
        return User.findOneAndUpdate(params, userData, options);
    },
    deleteUser: (params) => {
        return User.deleteOne(params);
    },
};

function _getUserFilterQuery(otherFilters) {
    const searchObject = {};

    if(otherFilters.search) {
        Object.assign(searchObject, {
            $or: [
                {name: {$regex: otherFilters.search, options: 'i'}},
                {email: {$regex: otherFilters.search, options: 'i'}}
            ]
        })
    }

    if(otherFilters.ageGte) {
        Object.assign(searchObject, {
            age: {$gte: +otherFilters.ageGte}
        })
    }

    if(otherFilters.ageLte) {
        Object.assign(searchObject, {
            age: {
                ...searchObject.age || {},
                $lte: +otherFilters.ageLte
            }
        }) // цей запис дасть нам змогу додати ще одне поле age, не перетерши попереднє
    }
    console.log(JSON.stringify((searchObject, null, 2)));

    return otherFilters
}
