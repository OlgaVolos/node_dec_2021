const {Schema, model} = require('mongoose');

const UserSchema = new Schema({
    name: {
        type: String,
        trim: true,
    },
    age: {
        type: Number,
    },
    email: {
        type: String,
        trim: true,
    },
    password: {
        type: String
    },
}, {timestamps: true});

module.exports = model('user', UserSchema)
