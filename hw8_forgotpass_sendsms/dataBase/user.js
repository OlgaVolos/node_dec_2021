const {Schema, model} = require('mongoose');
const {passwordService} = require("../services/password.service");

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
}, {timestamps: true});


UserSchema.statics = {
    createWithHashPassword: async  function(userToSave){
        const hashedPassword = await passwordService.hashPassword(userToSave.password);

        return this.create({...userToSave, password: hashedPassword})
    }
}  // this посилається на UserSchema, нема автокомплітів, потім підставляємо, куди нам треба
// це наш кастомний метод для праці зі схемою

UserSchema.methods = {
    async comparePasswords(password) {
        await passwordService.comparePassword(this.password, password)
    }
} // methods працює до record, this це один user
// застосовується до одного єдиного юзера. це екземпляр класу,
// його потім можна викликати до юзера в мідлварі

module.exports = model('user', UserSchema);

