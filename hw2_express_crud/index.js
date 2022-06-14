const express = require('express');

const {fileService} = require("./services");

const app = express();
app.use(express.json());


app.get('/users', async (req, res) => {
    const users = await fileService.reader();
    res.json(users)
});

app.get('/users/:userId', async (req, res) => {
    const {userId} = req.params;
    const users = await fileService.reader();

    const user = users.find(user => user.id === +userId);
    if (!user) {
        return res.status(400).json(`User with id ${userId} not found`)
    }
    res.json(user)
});


app.post('/users', async (req, res) => {
    const {name, age} = req.body;
    if (!Number.isInteger(age) || age < 18) {
        return res.status(400).json('Set valid age')
    }
    if (!name || name.length < 2) {
        return res.status(400).json('Set valid name')
    }
    const users = await fileService.reader();

    const newUser = {...req.body, id: users.length ? users[users.length - 1].id + 1 : 1}
    await fileService.writer([...users, newUser])
    res.status(201).json(newUser); //статус 201, коли щось створюємо, чи обновляємо (created)
});

// app.delete('/users/:userId', async (req, res) => {
//     const {userId} = req.params;
//     const users = await fileService.reader();
//     const user = users.find(user => user.id === +userId);
//     if(!user){
//         return  res.status(400).json(`User with id ${userId} not found`)
//     }
//     const userFilter = users.filter(user => user.id !== +userId);
//     await fileService.writer(userFilter);
//
//     res.sendStatus(204)
// });

app.delete('/users/:userId', async (req, res) => {
    const {userId} = req.params;
    const users = await fileService.reader();

    const index = users.findIndex(user => user.id === +userId);

    if (index === -1) {
        return res.status(400).json(`User with id ${userId} not found`)
    }
    users.splice(index, 1);
    await fileService.writer(users);

    res.sendStatus(204)
});

// app.put('/users/:userId', async (req, res) => {
//     const {name, age} = req.body;
//     const {userId} = req.params
//
//     if(age && !Number.isInteger(age) || age<18){
//         return  res.status(400).json(`Set valid age`);
//     }
//     if(name && name.length<2){
//         return  res.status(400).json(`Set valid name`);
//     }
//     const users = await fileService.reader();
//
//     const userForUpdate = users.find(user => user.id === +userId);
//     if(!userForUpdate){
//         return  res.status(400).json(`User with id ${userId} not found`)
//     }
//     const updatedUser = Object.assign(userForUpdate, req.body)
//
//     await fileService.writer([...users]);
//
//     res.status(201).json(updatedUser);
// });

app.put('/users/:userId', async (req, res) => {
    const {name, age} = req.body;
    const {userId} = req.params;

    if (age && !Number.isInteger(age) || age < 18) {
        return res.status(400).json('Set valid age');
    }
    if (name && name.length < 2) {
        return res.status(400).json('Set valid name');
    }

    const users = await fileService.reader();

    const index = users.findIndex((user) => user.id === +userId);

    if (index === -1) {
        return res.status(400).json(`User with id ${userId} not found`)
    }

    const updatedUser = Object.assign(users[index], req.body);

    // const updatedUser = {...users[index], ...req.body};
    // users.splice(index, 1);
    // await fileService.writer([...users, updatedUser]);
    // працює і без цього, але хай тут буде

    await fileService.writer([...users]);

    res.status(201).json(updatedUser);
});

app.listen(5000, () => {
    console.log('Started on port 5000')
})

//всі перевірки потрібно робити до того, як ми стукаємося в базу даних
// Object.assign допомагає нам зліпити до купи нового юзера.
// Присвоює нові дані у вхідний об"єкт, не порушуючи структури вхідних даних
