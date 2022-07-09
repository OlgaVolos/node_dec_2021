module.exports = {
    userPresenter: (user) => {
        return {
            _id: user._id,
            name: user.name,
            email: user.email,
            age: user.age,
            createAt: user.createAt,
            updateAt: user.updateAt,
        }
    }
};
