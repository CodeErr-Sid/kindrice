import { shippingPrice } from "../config/shiprocket.js";
import { fetchOrderId } from "./orderController.js";

const getShippingPrice = async (req, res) => {
    const { addresses } = req.body;

    try {
        const addressShippingInfo = await Promise.all(addresses.map(async (address) => {
            const shippingMethods = [
                {
                    "id": "1",
                    "description": "Free shipping",
                    "name": "Delivery within 5 days",
                    "serviceable": true,
                    "shipping_fee": 1000, // in paise. Here 1000 = 1000 paise, which equals to ₹10
                    "cod": true,
                    "cod_fee": 1000 // in paise. Here 1000 = 1000 paise, which equals to ₹10
                },
                {
                    "id": "2",
                    "description": "Standard Delivery",
                    "name": "Delivered on the same day",
                    "serviceable": true,
                    "shipping_fee": 1000, // in paise. Here 1000 = 1000 paise, which equals to ₹10
                    "cod": false,
                    "cod_fee": 0 // in paise. Here 1000 = 1000 paise, which equals to ₹10
                }
            ]

            return {
                id: address.id,
                zipcode: address.zipcode,
                state_code: address.state_code,
                country: address.country, // Capitalize country
                shipping_methods: shippingMethods
            };
        }));



        res.send({ addresses: addressShippingInfo });

    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export { getShippingPrice };
