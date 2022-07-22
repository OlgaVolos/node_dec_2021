module.exports = {
    userPresenter: (user) => {
        return {
            _id: user._id,
            name: user.name,
            email: user.email,
            phone: user.phone,
            avatar: user.avatar,
            age: user.age,
            createAt: user.createAt,
            updateAt: user.updateAt,
        }
    }
};
