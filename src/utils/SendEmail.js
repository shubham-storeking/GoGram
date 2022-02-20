const nodemailer = require('nodemailer')

const mailer = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: process.env.EMAIL_PROVIDER,
        pass: process.env.EMAIL_PROVIDER_PASSWORD
    }
})

// Sends email. Uses email provider credentials from the .env file. 
// The 'message' argument is an object containing html and/or text properties
function SendEmail(receiverEmail, subject, message)
{
    const options = {
        from: process.env.EMAIL_PROVIDER,
        to: receiverEmail,
        subject,
        html: message.html,
        text: message.text
    }

    mailer.sendMail(options)
}

module.exports = SendEmail