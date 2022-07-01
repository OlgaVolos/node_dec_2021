const {Schema, model} = require('mongoose');

const UserSchema = new Schema({
    name: {
        type: String,
        require: true,
        trim: true
    },
    email:{
        type: String,
        // unique: true, // можна не писати, бо ми валідуємо в joi
        require: true,
        trim: true,
        // lowercase: true //можна не писати, бо ми валідуємо в joi
    },
    password: {
        type: String,
        require: true,
    },
    age:{
        type: Number
    }

}, {timestamps: true})

module.exports = model('user', UserSchema)
