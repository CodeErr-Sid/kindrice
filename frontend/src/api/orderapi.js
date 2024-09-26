import axios from "axios"

export const createOrder = async (url, productId, weightCategory, quantity) => {
    try {
        const response = await axios.post(url + "/api/orders/create", {
            productId,
            weightCategory,
            quantity
        });

        return response;
    } catch (error) {

    }
}