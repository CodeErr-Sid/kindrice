import axios from "axios";


export const getShippingPrices = async (url, pincode, totalWeight, totalPrice) => {

    try {
        const response = await axios.post(url + "/api/orders/courierservice", {
            pincode,
            totalWeight,
            totalPrice
        })

        return response.data.data[0];
    } catch (error) {
        return error
    }
}


// Courier Servicablity