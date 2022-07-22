const {Schema, model} = require('mongoose');

const UserSchema = new Schema({
    name: {
        type: String,
        trim: true,
        required: true
    },
    age: {
        type: Number,
        required: true
    },
    email: {
        type: String,
        trim: true,
        required: true,
        lowercase: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    phone: {
        type: String,
        required: true,
    },
    avatar: String,

}, {timestamps: true});

module.exports = model('user', UserSchema);
