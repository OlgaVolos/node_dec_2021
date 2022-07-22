const express = require('express');
const expressFileUpload = require('express-fileupload');
const mongoose = require('mongoose');
const path = require("path");

require('dotenv').config({path: path.join(__dirname, 'environments', `${process.env.MODE}.env`)})

const {config} = require("./configs");
const {userRouter, authRouter} = require("./routes");

mongoose.connect(config.MONGO_URL)

const app = express();

app.use(express.json());
app.use(express.urlencoded({extended: true}));

app.use(expressFileUpload()) // ставимо до неї типізацію "@types/express-fileupload",
// можна проставляти опції, а можна просто як ф-цію. Воно працює як мідлвара,
// дозволить нам загружати фотки. Прописується одразу над роутерами
app.use('/auth', authRouter);
app.use('/users', userRouter);

app.use('*', (req, res) => {
    res.status(404).json('Router not found');
});

app.use((err, req, res, next) => {
    res
        .status(err.status || 500)
        .json({
            error: err.message || 'Unknown Error',
            code: err.status || 500,
        })
});

app.listen(config.PORT, () => {
    console.log(`Started on ${config.PORT} port`)
})
