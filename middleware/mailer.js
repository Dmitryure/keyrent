const nodemailer = require('nodemailer')

function sendEmail(type, email, text_message) {
    let transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: 'dmitryure@gmail.com',
            pass: 'reebyt11',
        }
    })

    let mailOptions = {
        from: "dmitryure@gmail.com",
        to: email,
        subject: type,
        text: text_message,
    }
    transporter.sendMail(mailOptions, function (error, info) {
        if (error) {
            console.log(error)
        } else {
            console.log("Email sent :" + info.response)
        }
    })
}




module.exports = sendEmail;