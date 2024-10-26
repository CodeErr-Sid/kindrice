import Razorpay from 'razorpay';
import Product from '../models/product.js';
import dotenv from 'dotenv';
import { validatePaymentVerification } from 'razorpay/dist/utils/razorpay-utils.js';
import { generateOrderID, formatOrderDate } from '../utils/shiprocketOrderUtils.js';
import { createShipRocketOrder, generateAWB, pickupGeneration } from '../config/shiprocket.js';
import { createCustomerOrder, createGuestOrder } from './ordersController.js';
import { saveAddressToUser, sendOrderConfirmationEmail } from './userController.js';
dotenv.config();

// test configration
const keyId = process.env.RAZORPAY_KEY_ID
const keySecret = process.env.RAZORPAY_KEY_SECRET


const liveKeyId = process.env.RAZORPAY_LIVE_KEY_ID
const liveKeySecret = process.env.RAZORPAY_LIVE_KEY_SECRET




const instance = new Razorpay({
    key_id: liveKeyId,
    key_secret: liveKeySecret
});



// buy now 
const createOrder = async (req, res) => {
    const { productId, weightCategory, quantity } = req.body;

    try {
        // Find the product by ID
        const product = await Product.findById(productId);

        if (!product) {
            return res.status(404).json({ message: 'Product not found' });
        }

        // Find the weight category
        const weightCategoryDetails = product.weightPrice.find(weight => weight._id.toString() === weightCategory);

        if (!weightCategoryDetails) {
            return res.status(404).json({ message: 'Weight category not found' });
        }

        const totalWeight = weightCategoryDetails.weight.value * quantity;

        // Prepare data for Razorpay
        // Prepare data for Razorpay
        const totalAmount = Math.round(weightCategoryDetails.totalPrice * quantity); // Convert to paise and ensure it's an integer
        var data = {
            "amount": totalAmount * 100, // in paise.
            "currency": "INR",
            "receipt": `reciept${Date.now()}`,
            "notes": { totalWeight: totalWeight, productId: productId, weightCategory: weightCategory, quantity: quantity },
            "line_items_total": totalAmount * 100, // in paise.
            "line_items": [
                {
                    "sku": weightCategoryDetails.sku,
                    "variant_id": weightCategoryDetails._id.toString(), // Weight category ID
                    "price": Math.round(weightCategoryDetails.totalPrice * 100), // Price in paise
                    "offer_price": Math.round(weightCategoryDetails.totalPrice * 100), // Offer price same as product price
                    "tax_amount": 0, // Included in the amount
                    "quantity": quantity, // Quantity from the request
                    "name": product.productName, // Product name
                    "description": product.description, // Product description
                    "weight": weightCategoryDetails.weight.value * 1000, // Convert to grams
                    "dimensions": {
                        "length": Math.round(weightCategoryDetails.dimensions.length),
                        "width": Math.round(weightCategoryDetails.dimensions.breadth),
                        "height": Math.round(weightCategoryDetails.dimensions.height)
                    }, // Use the dimensions from the weight category
                    "image_url": product.images[0], // Use the first image URL
                    "product_url": "https://kindrice.co/shop", // Example product URL
                    "notes": {} // Any additional notes if necessary
                },
            ],
        };

        // Create the order in Razorpay
        const razorpayOrder = await instance.orders.create(data);

        // Return the order details to the client
        res.json({ success: true, message: "order data fetched successfully", data: razorpayOrder });


    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal Server Error', error });
    }
};

// cart product
const createMultipleOrders = async (req, res) => {
    const items = req.body.items; // Expecting an array of items [{ productId, we, qu }, { productId, we, qu }]

    try {
        const lineItems = [];
        const cartItems = [];
        let totalAmount = 0;
        let totalWeight = 0; // Variable to accumulate total weight

        // Iterate through each item in the provided array
        for (const item of items) {
            const { productId, weightCategory, quantity } = item;

            cartItems.push(item);

            // Find the product by ID
            const product = await Product.findById(productId);
            if (!product) {
                return res.status(404).json({ message: `Product not found for ID: ${productId}` });
            }

            // Find the weight category
            const weightCategoryDetails = product.weightPrice.find(weight => weight._id.toString() === weightCategory);
            if (!weightCategoryDetails) {
                return res.status(404).json({ message: `Weight category not found for weight ID: ${weightCategory}` });
            }

            // Calculate the total amount for this item
            const itemAmount = Math.round(weightCategoryDetails.totalPrice * quantity);
            totalAmount += itemAmount; // Accumulate the total amount

            // Calculate the weight for this item
            const itemWeight = weightCategoryDetails.weight.value * quantity; // Total weight for this item
            totalWeight += itemWeight; // Accumulate total weight in grams

            // Prepare line item data
            lineItems.push({
                sku: weightCategoryDetails.sku,
                variant_id: weightCategoryDetails._id.toString(),
                price: Math.round(weightCategoryDetails.totalPrice * 100), // Price in paise
                offer_price: Math.round(weightCategoryDetails.totalPrice * 100), // Offer price same as product price
                tax_amount: 0, // Included in the amount
                quantity: quantity, // Quantity from the request
                name: product.productName, // Product name
                description: product.description, // Product description
                weight: itemWeight * 1000, // Convert to grams
                dimensions: {
                    length: Math.round(weightCategoryDetails.dimensions.length),
                    width: Math.round(weightCategoryDetails.dimensions.breadth),
                    height: Math.round(weightCategoryDetails.dimensions.height)
                }, // Use the dimensions from the weight category
                image_url: product.images[0], // Use the first image URL
                product_url: "https://kindrice.co/shop", // Example product URL
                notes: {} // Any additional notes if necessary
            });
        }

        // Prepare data for Razorpay
        const data = {
            amount: totalAmount * 100, // Total amount in paise
            currency: "INR",
            receipt: `receipt${Date.now()}`,
            notes: { totalWeight: totalWeight, items: cartItems }, // Include total weight in notes
            line_items_total: totalAmount * 100, // in paise
            line_items: lineItems // The array of line items prepared above
        };

        // Create the order in Razorpay
        const razorpayOrder = await instance.orders.create(data);

        // Return the order details to the client
        res.json({ success: true, message: "Order data fetched successfully", data: razorpayOrder });

    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal Server Error', error });
    }
};


const fetchOrderById = async (req, res) => {
    try {
        const { orderId } = req.body;

        const response = await instance.orders.fetch(orderId);

        res.json(response)
    } catch (error) {
        res.status(500).json({ message: "Internal Server Error", error })
    }
}

const fetchPaymentById = async (paymentId) => {
    try {
        const response = await instance.payments.fetch(paymentId)
        if (response) {
            return { success: true, data: response }
        }
    } catch (error) {
        return ({ message: "Internal Server Error", error })
    }
}

const fetchAllOrders = async (req, res) => {
    try {
        const response = await instance.orders.all({
            "expand[]": "payments"
        })

        res.json(response)
    } catch (error) {
        res.status(500).json({ message: "Internal Server Error", error });
    }
}

const fetchOrderId = async (orderId) => {
    try {

        const response = await instance.orders.fetch(orderId);

        return response;
    } catch (error) {
        return new Error({ message: "Internal Server Error", error })
    }
}


// Normal Payment API

const normalCheckoutOrder = async (req, res) => {

    const { amount, notes } = req.body;

    try {
        const amountInPaise = Math.round(amount * 100)

        var options = {
            amount: amountInPaise,  // amount in the smallest currency unit
            currency: "INR",
            receipt: `reciept${Date.now()}`,
            notes: notes
        };
        const order = await instance.orders.create(options);

        res.json(order);
    } catch (error) {
        res.json(error)
    }
}

const refundPayment = async (paymentId, amount) => {
    try {
        const response = await instance.payments.refund(paymentId, {
            "amount": amount,
            "speed": "normal",
            "notes": {
                "message": "Refunded amount ₹" + (amount / 100)
            },
            "receipt": "Receipt No. 31"
        });

        return { success: true, data: response };
    } catch (error) {
        console.error(`Failed to refund payment for payment ID ${paymentId}:`, error.response ? error.response.data : error.message);

        // Handle refund failure scenario
        return {
            success: false,
            message: 'Failed to process refund',
            error: error.response ? error.response.data : error.message
        };
    }
};

const verifyPayment = async (req, res) => {
    const { razorpay_order_id, razorpay_payment_id, razorpay_signature } = req.body;
    const userId = req.userId;

    try {
        // Validate the payment signature
        const isValid = validatePaymentVerification(
            { order_id: razorpay_order_id, payment_id: razorpay_payment_id },
            razorpay_signature,
            liveKeySecret
        );

        if (!isValid) {
            return res.status(400).json({ success: false, message: 'Invalid payment signature' });
        }

        // Fetch payment details
        const paymentObject = await fetchPaymentById(razorpay_payment_id);
        if (!paymentObject.success) {
            return res.status(500).json({ success: false, message: 'Payment verification failed' });
        }

        const { notes, amount, method } = paymentObject.data;
        const { courier_id, courier_company_name, packageCategory, orderData, shippingPrice, saveThisAddress } = notes[0]; // Assuming notes[0] has the necessary data

        // Prepare order data for Shiprocket
        const shiprocketOrderData = {
            order_id: generateOrderID(),  // function to generate unique order ID
            order_date: formatOrderDate(), // function to format current date
            pickup_location: "warehouse",
            channel_id: 5475071,         // Assuming this is static for your case
            comment: "Kind Low Gi Rice",
            payment_method: "Prepaid",
            ...orderData                   // Merges other necessary order details
        };

        // Create the order in Shiprocket
        const shipRocketOrder = await createShipRocketOrder(shiprocketOrderData);

        if (!shipRocketOrder) {
            const refundResponse = await refundPayment(razorpay_payment_id, amount);

            if (!refundResponse.success) {
                console.error(`Refund failed for payment ID ${razorpay_payment_id}. Please contact support.`);
                return res.status(500).json({
                    success: false,
                    message: 'Failed to generate AWB and refund the payment. Please contact Kindrice support.',
                    paymentId: razorpay_payment_id,
                    refundError: refundResponse.error
                });
            }

            res.status(500).json({
                success: false,
                message: 'Failed to generate AWB, but payment has been refunded successfully',
                refund: refundResponse.data
            });

            return;
        }

        // Generate AWB (Air Waybill) for the shipment
        const shippingDetails = {
            shipment_id: shipRocketOrder.shipment_id,
            courier_id
        };

        const shipRocketAWB = await generateAWB(shippingDetails);

        if (!shipRocketAWB.success) {
            const refundResponse = await refundPayment(razorpay_payment_id, amount);

            if (!refundResponse.success) {
                console.error(`Refund failed for payment ID ${razorpay_payment_id}. Please contact support.`);
                return res.status(500).json({
                    success: false,
                    message: 'Failed to generate AWB and refund the payment. Please contact Kindrice support.',
                    paymentId: razorpay_payment_id,
                    refundError: refundResponse.error
                });
            }

            res.status(500).json({
                success: false,
                message: 'Failed to generate AWB, but payment has been refunded successfully',
                refund: refundResponse.data
            });
        }

        const shipRocketPickupRequest = await pickupGeneration(shipRocketAWB.data.shipment_id,);

        if (!shipRocketPickupRequest.success) {
            console.log(shipRocketPickupRequest)
        }

        const {
            billing_customer_name,
            billing_last_name,
            billing_email,
            billing_city,
            billing_pincode,
            billing_country,
            billing_state,
            billing_address,
            order_id,
            sub_total,
            order_items,
            shipping_is_billing,
        } = shiprocketOrderData;

        // Construct parameters for the email
        const name = shipping_is_billing ? billing_customer_name : shiprocketOrderData.shipping_customer_name;
        const lastname = shipping_is_billing ? billing_last_name : shiprocketOrderData.shipping_last_name;
        const email = shipping_is_billing ? billing_email : shiprocketOrderData.shipping_email;
        const addressLine1 = shipping_is_billing ? billing_address : shiprocketOrderData.shipping_address;
        const city = shipping_is_billing ? billing_city : shiprocketOrderData.shipping_city
        const pincode = shipping_is_billing ? billing_pincode : shiprocketOrderData.shipping_pincode
        const country = shipping_is_billing ? billing_country : shiprocketOrderData.shipping_country
        const state = shipping_is_billing ? billing_state : shiprocketOrderData.shipping_state
        const orderId = order_id;
        const message = "We're thankful you've chosen Kind Rice, and we're excited to bring wholesome goodness to your plate while helping nurture a healthy community.";
        const awb = shipRocketAWB.data.awb_code; // Assuming shipRocketAWB is defined elsewhere
        const shippingCharge = shippingPrice;
        const totalAmount = sub_total + shippingPrice;

        console.log(shipRocketAWB);
        console.log(awb);

        // Format order details for the email
        const orderDetails = order_items.map(item => ({
            name: item.name, // assuming this key is present in order_items
            quantity: item.units, // assuming 'units' key represents quantity
            price: item.selling_price // assuming this key represents the selling price
        }));

        const shipping_address = {
            name: name + " " + lastname,
            addressLine1: addressLine1,
            city: city,
            pincode: pincode,
            country: country,
            state: state,
        }

        const productImage = "https://res.cloudinary.com/dtiqiqrw7/image/upload/v1726375202/Kindrice_Products/low_gi_rice/zwoygyfdg9pvurtdslei.jpg"

        // Sending the email
        const confirmationMail = await sendOrderConfirmationEmail(
            name,
            email,
            orderId,
            message,
            awb,
            orderDetails,
            method,
            courier_company_name,
            productImage,
            shipping_address,
            shippingCharge,
            sub_total,
            totalAmount
        );

        if (!confirmationMail.success) {
            res.status(500).json(confirmationMail)
        }


        const customerOrder = {
            razorpay_payment_id,
            shiprocket_order_id: shipRocketOrder.order_id,
            awb: shipRocketAWB.data.awb_code, // Place awb code here
            userId
        };

        // Initialize address saving status
        let addressSavingStatus = false;

        // Save address if indicated
        if (saveThisAddress) {
            const addressSavingMessage = await saveAddressToUser(orderData, userId);
            addressSavingStatus = addressSavingMessage.success; // Set status based on result
        }

        const kindriceOrder = await createCustomerOrder(customerOrder, packageCategory, courier_id);

        if (!kindriceOrder.success) {
            res.status(500).json(kindriceOrder)
        }

        res.json({
            success: true,
            message: 'Order created successfully Mail Has been Sent to ' + email,
            data: kindriceOrder.data
        });

    } catch (error) {
        console.error('Error verifying payment:', error);
        res.status(500).json({ success: false, message: 'Server error, please try again later' });
    }
};

const guestPaymentVerification = async (req, res) => {
    const { razorpay_order_id, razorpay_payment_id, razorpay_signature } = req.body;

    try {
        // Validate the payment signature
        const isValid = validatePaymentVerification(
            { order_id: razorpay_order_id, payment_id: razorpay_payment_id },
            razorpay_signature,
            liveKeySecret
        );

        if (!isValid) {
            return res.status(400).json({ success: false, message: 'Invalid payment signature' });
        }

        // Fetch payment details
        const paymentObject = await fetchPaymentById(razorpay_payment_id);
        if (!paymentObject.success) {
            return res.status(500).json({ success: false, message: 'Payment verification failed' });
        }

        const { notes, amount, method } = paymentObject.data;
        const { courier_id, courier_company_name, packageCategory, orderData, shippingPrice } = notes[0]; // Assuming notes[0] has the necessary data

        // Prepare order data for Shiprocket
        const shiprocketOrderData = {
            order_id: generateOrderID(),  // function to generate unique order ID
            order_date: formatOrderDate(), // function to format current date
            pickup_location: "warehouse",
            channel_id: 5475071,         // Assuming this is static for your case
            comment: "Kind Low Gi Rice",
            payment_method: "Prepaid",
            ...orderData                   // Merges other necessary order details
        };

        // Create the order in Shiprocket
        const shipRocketOrder = await createShipRocketOrder(shiprocketOrderData);

        if (!shipRocketOrder) {
            const refundResponse = await refundPayment(razorpay_payment_id, amount);

            if (!refundResponse.success) {
                console.error(`Refund failed for payment ID ${razorpay_payment_id}. Please contact support.`);
                return res.status(500).json({
                    success: false,
                    message: 'Failed to generate AWB and refund the payment. Please contact Kindrice support.',
                    paymentId: razorpay_payment_id,
                    refundError: refundResponse.error
                });
            }

            res.status(500).json({
                success: false,
                message: 'Failed to generate AWB, but payment has been refunded successfully',
                refund: refundResponse.data
            });

            return;
        }

        // Generate AWB (Air Waybill) for the shipment
        const shippingDetails = {
            shipment_id: shipRocketOrder.shipment_id,
            courier_id
        };

        const shipRocketAWB = await generateAWB(shippingDetails);

        if (!shipRocketAWB.success) {
            const refundResponse = await refundPayment(razorpay_payment_id, amount);

            if (!refundResponse.success) {
                console.error(`Refund failed for payment ID ${razorpay_payment_id}. Please contact support.`);
                return res.status(500).json({
                    success: false,
                    message: 'Failed to generate AWB and refund the payment. Please contact Kindrice support.',
                    paymentId: razorpay_payment_id,
                    refundError: refundResponse.error
                });
            }

            res.status(500).json({
                success: false,
                message: 'Failed to generate AWB, but payment has been refunded successfully',
                refund: refundResponse.data
            });
        }

        const shipRocketPickupRequest = await pickupGeneration(shipRocketAWB.data.shipment_id,);

        if (!shipRocketPickupRequest.success) {
            console.log(shipRocketPickupRequest)
        }

        const {
            billing_customer_name,
            billing_last_name,
            billing_email,
            billing_phone,
            billing_city,
            billing_pincode,
            billing_country,
            billing_state,
            billing_address,
            order_id,
            sub_total,
            order_items,
            shipping_is_billing,
        } = shiprocketOrderData;

        // Construct parameters for the email
        const name = shipping_is_billing ? billing_customer_name : shiprocketOrderData.shipping_customer_name;
        const lastname = shipping_is_billing ? billing_last_name : shiprocketOrderData.shipping_last_name;
        const email = shipping_is_billing ? billing_email : shiprocketOrderData.shipping_email;
        const phoneno = shipping_is_billing ? billing_phone : shiprocketOrderData.shiping_phone;
        const addressLine1 = shipping_is_billing ? billing_address : shiprocketOrderData.shipping_address;
        const city = shipping_is_billing ? billing_city : shiprocketOrderData.shipping_city
        const pincode = shipping_is_billing ? billing_pincode : shiprocketOrderData.shipping_pincode
        const country = shipping_is_billing ? billing_country : shiprocketOrderData.shipping_country
        const state = shipping_is_billing ? billing_state : shiprocketOrderData.shipping_state
        const orderId = order_id;
        const message = "We're thankful you've chosen Kind Rice, and we're excited to bring wholesome goodness to your plate while helping nurture a healthy community.";
        const awb = shipRocketAWB.data.awb_code; // Assuming shipRocketAWB is defined elsewhere
        const shippingCharge = shippingPrice;
        const totalAmount = sub_total + shippingPrice;

        console.log(shipRocketAWB);
        console.log(awb);

        // Format order details for the email
        const orderDetails = order_items.map(item => ({
            name: item.name, // assuming this key is present in order_items
            quantity: item.units, // assuming 'units' key represents quantity
            price: item.selling_price // assuming this key represents the selling price
        }));

        const shipping_address = {
            name: name + " " + lastname,
            addressLine1: addressLine1,
            city: city,
            pincode: pincode,
            country: country,
            state: state,
        }

        const productImage = "https://res.cloudinary.com/dtiqiqrw7/image/upload/v1726375202/Kindrice_Products/low_gi_rice/zwoygyfdg9pvurtdslei.jpg"

        // Sending the email
        const confirmationMail = await sendOrderConfirmationEmail(
            name,
            email,
            orderId,
            message,
            awb,
            orderDetails,
            method,
            courier_company_name,
            productImage,
            shipping_address,
            shippingCharge,
            sub_total,
            totalAmount
        );

        if (!confirmationMail.success) {
            res.status(500).json(confirmationMail)
        }


        const customerOrder = {
            razorpay_payment_id,
            shiprocket_order_id: shipRocketOrder.order_id,
            awb: shipRocketAWB.data.awb_code, // Place awb code here
        };

        // Initialize address saving status
        const guestData = {
            name: name + lastname,
            email: email,
            phoneno: phoneno
        }

        const kindriceGuestOrder = await createGuestOrder(guestData, customerOrder, packageCategory, courier_id);

        if (!kindriceGuestOrder.success) {
            res.status(500).json(kindriceGuestOrder)
        }

        res.json({
            success: true,
            message: 'Order created successfully Mail Has been Sent to ' + email,
            data: kindriceOrder.data
        });

    } catch (error) {
        console.error('Error verifying payment:', error);
        res.status(500).json({ success: false, message: 'Server error, please try again later' });
    }
};




export { verifyPayment, createOrder, fetchAllOrders, fetchOrderById, createMultipleOrders, fetchOrderId, fetchPaymentById, normalCheckoutOrder, guestPaymentVerification }
