import dotenv from "dotenv";
import generateHtml from "./emailGenration.js";
import { mailTransport } from "../config/nodemailer.js";
const result = dotenv.config({ path: "../.env" });

if (result.error) {
    console.error("Error loading .env file:", result.error);
} else {
    console.log("Successfully loaded .env file");
}


const sendOrderConfirmationEmail = async (name, email, orderId, message, awb, orderDetails, paymentMethod, courierCompanyName, image, shippingAddress, shippingCharge, totalAmount) => {
    // Create an HTML table for the order details

    const senderEmail = process.env.CUSTOME_DOMAIN_EMAIL_USER;

    console.log(senderEmail)

    const htmlContent = generateHtml(name, email, orderId, message, awb, orderDetails, paymentMethod, courierCompanyName, image, shippingAddress, shippingCharge, totalAmount)

    const mailOptions = {
        from: senderEmail, // Sender address
        to: email, // Replace with recipient's email address
        subject: `Order Confirmation - ${orderId}`,
        html: htmlContent,
    };

    try {
        const info = await mailTransport.sendMail(mailOptions);
        return { success: true, message: "Email Sent Successfully", data: info }
    } catch (error) {
        return { success: false, message: error }
    }
}


const order_items = [
    {
        name: "Low GI Rice - 1kg",
        units: 2,
        selling_price: 450
    },
    {
        name: "Low GI Rice - 5kg",
        units: 1,
        selling_price: 1800
    }
];

const orderDetails = order_items.map(item => ({
    name: item.name,
    quantity: item.units,
    price: item.selling_price
}));

const shipping_address = {
    name: "John Doe",
    addressLine1: "123 Main Street",
    city: "Mumbai",
    pincode: "400001",
    country: "India",
    state: "Maharashtra",
};

const productImage = "https://res.cloudinary.com/dtiqiqrw7/image/upload/v1726375202/Kindrice_Products/low_gi_rice/zwoygyfdg9pvurtdslei.jpg";

const confirmationMail = await sendOrderConfirmationEmail(
    "John Doe", // name
    "aliakram9789@gmail.com", // email
    "ORD12345", // orderId
    "Thank you for your purchase!", // message
    "AWB123456789", // awb (tracking number)
    orderDetails, // orderDetails (mapped from order_items)
    "Prepaid", // method (payment method)
    "XYZ Couriers", // courier_company_name
    productImage, // productImage
    shipping_address, // shipping address object
    50, // shippingCharge
    2750 // totalAmount
);

console.log(confirmationMail);


