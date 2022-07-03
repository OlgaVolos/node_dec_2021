const {Schema, model} = require('mongoose');

const OAuthSchema = new Schema({
    userId: {
        type: Schema.Types.ObjectId, //посилання на ід юзера
        ref: 'user', // посилання до таблички, з якою зв"язуємося
        require: true
    },

    access_token: {
        type: String,
        require: true,
    },

    refresh_token: {
        type: String,
        require: true
    },
}, {timestamps: true});

module.exports = model('oauth', OAuthSchema);
