import dotenv from 'dotenv';
import nodemailer from 'nodemailer'

dotenv.config();

const email = process.env.EMAIL_USER 
const password = process.env.EMAIL_PASS 


const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
        user: email, // Your email address
        pass: password, // Your email password
    },
});

export default transporter;