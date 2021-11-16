const nodemailer = require('nodemailer')

const sendEmail = async (options) => {
    const transporter = nodemailer.createTransport({
        host: process.env.SMPTP_HOST,
        port: process.env.SMPTP_PORT,
        auth: {
            user: process.env.SMPTP_EMAIL,
            pass: process.env.SMPTP_PASSWORD
        }
    })

    let message = {
        from: `${process.env.SMPTP_FROM_NAME}  <${process.env.FROM_EMAIL}>`,
        to: options.email,
        subject: options.subject,
        text: options.message
    }

    const info = await transporter.sendEmail(message)

    console.log('Message sent: %s', info.messageId);

}

module.exports = sendEmail