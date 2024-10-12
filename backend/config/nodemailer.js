import dotenv from 'dotenv';
import nodemailer from 'nodemailer'

dotenv.config();

const email = process.env.EMAIL_USER || "aliakram9789@gmail.com"
const password = process.env.EMAIL_PASS || "xavv dxpy ybjc onla"


const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
        user: email, // Your email address
        pass: password, // Your email password
    },
});

console.log(email, password)

export default transporter;