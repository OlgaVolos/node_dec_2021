const {config} = require("../configs");

const client = require('twilio')(config.TWILIO_ACCOUNT_SID, config.TWILIO_AUTH_TOKEN);

module.exports = {
    sendSMS: async (phone, message) => {
        try {
            console.log(`SMS start sending. to: ${phone}, message: ${message}`);

            const smsInfo = await client.messages.create({
                    from: config.TWILIO_PHONE_NUMBER,
                    to: phone,
                    body: message
                })
            console.log(`Sms response | status: ${smsInfo.status} | sid: ${smsInfo.sid}`);
        } catch (e) {
            console.error(`SMS error. to: ${phone}, error: ${e}`);

        }
    }
} // сервіс підключаємо в контроллерах, де потрібно. Наприклад, при створенні юзера

