const {User} = require("../dataBase");

module.exports = {
    findAll: (params = {}) => {
        return User.find(params);
    },
    getAllWithPagination: async (query = {}) => {

        const {page=1, perPage = 5, ...otherFilters} = query;
        const skip = (page-1) * perPage; // 0 на першій сторінці

        // perPage скільки ітемів на сторінку

        const filterQuery = _getUserFilterQuery(otherFilters);

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

function _getUserFilterQuery(filters) {
    const searchObject = {};

    if(filters.search) {
        Object.assign(searchObject, {
            $or: [
                {name: {$regex: filters.search, $options: 'i'}},
                {email: {$regex: filters.search, $options: 'i'}}
            ]
        }) //об"єднання фільтру пошуку імені та/або мейла
    }

    if(filters.ageGte) {
        Object.assign(searchObject, {
            age: {$gte: +filters.ageGte}
        })
    }

    if(filters.ageLte) {
        Object.assign(searchObject, {
            age: {
                ...searchObject.age || {},
                $lte: +filters.ageLte
            }
        }) // цей запис дасть нам змогу додати ще одне поле age, не перетерши попереднє
    }

    return searchObject
}
