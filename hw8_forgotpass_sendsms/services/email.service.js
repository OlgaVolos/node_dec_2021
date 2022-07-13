const hbs = require('nodemailer-express-handlebars'); // це ф-я
const nodemailer = require('nodemailer')
const path = require("path");

const emailTemplate = require('../email-templates')
const {config} = require("../configs");
const {CustomError} = require("../errors");


module.exports = {
    sendMail: async (userMail = '', emailAction = '', context = {}) => {
        const transporter = nodemailer.createTransport({
            from: 'No reply',
            auth: {
                user: config.NO_REPLY_EMAIL,
                pass: config.NO_REPLY_EMAIL_PASSWORD
            },
            service: 'gmail',
        });

        const hbsOptions = {
            viewEngine: {
                extname: '.hbs',
                defaultLayout: 'main',
                layoutsDir: path.join(__dirname, '../email-templates', 'layouts'),
                partialsDir: path.join(__dirname, '../email-templates', 'partials'),
            },
            viewPath: path.join(__dirname, '../email-templates', 'views'),
            extName: '.hbs',
        }
        transporter.use('compile', hbs(hbsOptions));

        const templateInfo = emailTemplate[emailAction];

        if(!templateInfo){
            throw new CustomError('Wrong email action', 500)
        }

        context.frontendURL = config.FRONTEND_URL;

        console.info(`Email start sending. action: ${emailAction}, email: ${userMail}`);

        return transporter.sendMail({
            to: userMail,
            subject: templateInfo.subject,
            template: templateInfo.template,
            context
        })


    }
}
