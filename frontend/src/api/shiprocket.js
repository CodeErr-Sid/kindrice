import axios from "axios";

export const getShippingPrices = async (url, pincode, totalWeight, totalPrice, length, breadth, height) => {

    try {
        const response = await axios.post(url + "/api/orders/courierservice", {
            pincode,
            totalWeight,
            totalPrice,
            length,
            breadth,
            height
        })

        return response.data.data[0];
    } catch (error) {
        return error
    }
}


// Courier Servicablity