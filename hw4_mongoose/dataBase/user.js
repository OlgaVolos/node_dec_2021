const {Schema, model} = require('mongoose');

const UserSchema = new Schema({
    name: {
        type: String,
        require: true,
        trim: true
    },

    email: {
        type: String,
        unique: true, // унікальний
        require: true, // обов"язкове поле
        trim: true,
        lowercase: true
    },

    password: {
        type: String,
        require: true
    },

    age: {
        type: Number,
        // default: 20 //необов"язкове поле, якщо вік не вкажуть, то по дефолту буде 20
    }
}, { timestamps: true })

module.exports = model('user', UserSchema)
