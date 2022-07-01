const express = require('express');
const mongoose = require('mongoose');

const {config} = require("./configs");

mongoose.connect(config.MONGO_URL);

const app = express();

app.use(express.json());
app.use(express.urlencoded({extended: true}));

app.use((err, req, res, next) => {
   res
       .status(err.status || 500)
       .json({
           error: err.message || 'Unknown Error',
           code: err.status || 500,
       })
});

app.listen(config.PORT, () => {
    console.log(`Server started on port ${config.PORT}`)
})
