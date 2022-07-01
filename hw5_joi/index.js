const express = require('express');
const mongoose = require('mongoose');
const {config} = require("../hw4_mongoose/configs");
const {userRouter} = require("./routers");

mongoose.connect(config.MONGO_URL);

const app = express();

app.use(express.json());
app.use(express.urlencoded({extended: true}));

app.use('/users', userRouter);
app.use('*', (req, res) => {
    res.status(404).json('Route not found');
});

app.use((err, req, res, next) => {
    res
        .status(err.status || 500)
        .json({
            error: err.message || 'Unknown Error',
            code: err.status || 500
        });
});


app.listen(config.PORT, () => {
    console.log(`Server started on port ${config.PORT}`);
});
