import dotenv from 'dotenv';
import nodemailer from 'nodemailer'

dotenv.config();

const email = process.env.EMAIL_USER
const password = process.env.EMAIL_PASS

const c_user = process.env.CUSTOME_DOMAIN_EMAIL_USER
const c_pass = process.env.CUSTOME_DOMAIN_EMAIL_PASS


const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
        user: email, // Your email address
        pass: password, // Your email password
    },
});


// Create the transporter object
const mailTransport = nodemailer.createTransport({
    host: "smtpout.secureserver.net",
    secure: true,
    secureConnection: false, // TLS requires secureConnection to be false
    tls: {
        ciphers: 'SSLv3'
    },
    requireTLS: true,
    port: 465,
    debug: true,
    auth: {
        user: c_user,
        pass: c_pass
    }
});



export { transporter, mailTransport };