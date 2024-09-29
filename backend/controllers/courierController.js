import { shippingPrice } from "../config/shiprocket.js";
import { fetchOrderId } from "./orderController.js";

const getShippingPrice = async (req, res) => {
    const { razorpay_order_id, addresses } = req.body;
    
    try {
        // Fetch order details using the razorpay_order_id
        const order = await fetchOrderId(razorpay_order_id);

        // Extract total price (in paise) and convert to rupees
        const totalPrice = order.amount / 100;

        // Extract total weight from the order notes
        const totalWeight = order.notes.totalWeight;

        // Iterate over each address and fetch shipping options
        const addressShippingInfo = await Promise.all(addresses.map(async (address) => {
            const pincode = address.zipcode;

            // Call the shippingPrice function with required parameters (pincode, weight, price)
            const shippingOptions = await shippingPrice(pincode, totalWeight, totalPrice);

            // Map the shipping options to the required format
            const shippingMethods = shippingOptions.map((option, index) => ({
                id: String(index + 1),
                description: option.description || option.courier_name,
                name: `Delivery in ${option.estimated_delivery_days} days`,
                serviceable: true,
                shipping_fee: Math.round(option.freight_charge * 100), // converting to paise
                cod: false, // set to true if cod is available
                cod_fee: option.cod === 1 ? Math.round(option.cod_charges * 100) : 0 // cod_fee in paise, set to 0 if not available
            }));

            // Return the address object with shipping methods and capitalize the country
            return {
                ...address,
                country: address.country.toUpperCase(), // Capitalize country
                shipping_methods: shippingMethods
            };
        }));

        // Send the response with address shipping information
        res.status(200).json({ addresses: addressShippingInfo });

    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export { getShippingPrice };
