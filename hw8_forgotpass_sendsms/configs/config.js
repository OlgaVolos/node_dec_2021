module.exports = {
    PORT: process.env.PORT || 5555,
    MONGO_URL: process.env.MONGO_URL || 'mongodb://localhost:27017/test',

    ACCESS_TOKEN_SECRET: 'asd',
    REFRESH_TOKEN_SECRET: 'qwe',

    NO_REPLY_EMAIL: process.env.NO_REPLY_EMAIL || 'email@email.com',
    NO_REPLY_EMAIL_PASSWORD: process.env.NO_REPLY_EMAIL_PASSWORD || '!Qweasd',

    FRONTEND_URL: process.env.FRONTEND_URL || 'https://google.com',
}
