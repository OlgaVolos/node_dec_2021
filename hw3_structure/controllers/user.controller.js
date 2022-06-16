const {fileService} = require("../services");

module.exports = {
    getAllUsers: async (req, res) => {
        const users = await fileService.reader();
        res.json(users);
    },

    createUser: async (req, res) => {
        const {name, age} = req.body;
        if (!Number.isInteger(age) || age < 18) {
            return res.status(400).json('Set valid age');
        }
        if (!name || name.length < 2) {
            return res.status(404).json("Set valid name");
        }
        const users = await fileService.reader();

        // const newUser = Object.assign(id, req.body);
        const newUser = {...req.body, id: users.length ? users[users.length - 1].id + 1 : 1}


        await fileService.writer([...users, newUser]);

        res.status(201).json(newUser);
    },

    getUserById: async (req, res) => {
        const {userId} = req.params;
        const users = await fileService.reader();

        const user = users.find(user=> user.id === +userId);
        if(!user){
          return   res.status(400).json(`User with id ${userId} was not found`);
        }
        res.json(user);
    },

    deleteUserById: async (req, res) => {
        const {userId} = req.params;

        const users = await fileService.reader();
        const user = users.find(user => user.id === +userId);
        if(!user){
            return req.status(400).json(`User with id ${userId} was not found`);
        }
        const filteredUserArr = users.filter(user => user.id !==+userId);
        await fileService.writer(filteredUserArr);

        res.sendStatus(204);
    },

    updateUser: async (req, res) => {
        const {name, age} = req.body;
        const {userId} = req.params;
        if(age && !Number.isInteger(age) || age  < 18){
            return res.status(400).json('Set valid age')
        }
        if(name && name.length < 2){
            return res.status(400).json('Set valid name')
        }
        const users = await fileService.reader();

        const userForUpdate = users.find(user => user.id === +userId);
        if(!userForUpdate){
            return res.status(400).json(`User with id ${userId} was not found`)
        }
        const updatedUser = Object.assign(userForUpdate, req.body);

        await fileService.writer([...users]);

        res.status(201).json(updatedUser);
    }
}

