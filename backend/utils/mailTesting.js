import transporter from "../config/nodemailer.js";

const sendOrderConfirmationEmail = async (name, email, orderId, message, awb, orderDetails, shippingCharge, totalAmount) => {
    // Create an HTML table for the order details
    const orderDetailsHtml = orderDetails.map((item, index) => `
      <tr>
        <td>${index + 1}</td>
        <td>${item.name}</td>
        <td>${item.quantity}</td>
        <td>${item.price.toFixed(2)}</td>
      </tr>
    `).join('');

    const htmlContent = `
      <h1>Order Confirmation</h1>
      <p>Dear ${name},</p>
      <p>${message}</p>
      <p>Order ID: ${orderId}</p>
      <p>AWB Number: ${awb}</p>
      <table border="1" cellpadding="5">
        <thead>
          <tr>
            <th>S.No</th>
            <th>Name</th>
            <th>Quantity</th>
            <th>Price</th>
          </tr>
        </thead>
        <tbody>
          ${orderDetailsHtml}
        </tbody>
      </table>
      <p>Shipping Charge: ${shippingCharge.toFixed(2)}</p>
      <p>Total Amount: ${totalAmount.toFixed(2)}</p>
      <p>Thank you for your order!</p>
    `;

    const mailOptions = {
        from: 'aliakram9789@gmail.com', // Sender address
        to: email, // Replace with recipient's email address
        subject: `Order Confirmation - ${orderId}`,
        html: htmlContent,
    };

    try {
        const info = await transporter.sendMail(mailOptions);
        return { success: true, message: "Email Sent Successfully", data: info }
    } catch (error) {
        return { success: false, message: error }
    }
}


const orderData = {
    "billing_customer_name": "Jane Doe",
    "billing_email": "akramtest0000@gmail.com",
    "shipping_customer_name": "Jane Doe",
    "shipping_email": "jane.doe@example.com",
    "order_id": "ORD123456",
    "sub_total": 100.00,
    "order_items": [
        {
            "name": "Product A",
            "units": 2,
            "selling_price": 25.00
        },
        {
            "name": "Product B",
            "units": 1,
            "selling_price": 50.00
        },
        {
            "name": "Product C",
            "units": 1,
            "selling_price": 25.00
        }
    ],
    "shipping_is_billing": true,
    "shippingPrice": 10.00,
    "shipRocketAWB": {
        "awb": "AWB123456789"
    }
};

const sendMail = async () => {
    try {
        const {
            billing_customer_name,
            billing_email,
            shipping_customer_name,
            shipping_email,
            order_id,
            sub_total,
            order_items,
            shipping_is_billing,
            shippingPrice
        } = orderData;

        // Determine the name and email based on shipping and billing
        const name = shipping_is_billing ? billing_customer_name : shipping_customer_name;
        const email = shipping_is_billing ? billing_email : shipping_email;
        const message = "Thank you for using Kindrice";
        const awb = orderData.shipRocketAWB.awb; // Extracting AWB
        const totalAmount = sub_total + shippingPrice; // Calculating total amount

        // Format order details
        const orderDetails = order_items.map(item => ({
            name: item.name,
            quantity: item.units,
            price: item.selling_price
        }));

        const response = await sendOrderConfirmationEmail(
            name,
            email,
            order_id,
            message,
            awb,
            orderDetails,
            shippingPrice,
            totalAmount
        );

        const data = response.data

        console.log(data);

    } catch (error) {
        console.error("Error sending order confirmation email:", error);
    }
};

// Execute the sendMail function for testing
sendMail();
