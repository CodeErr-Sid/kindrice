import axios from "axios";

const registerUser = async (firebaseUID, email, name, url) => {
    try {
        // Send POST request to the server
        const response = await axios.post(url + "/api/user/register", {
            firebaseUID,
            email,
            name
        });

        // Handle success
        console.log('User registered successfully:', response.data);
        return response.data; // Return the response data for further processing if needed

    } catch (error) {
        // Handle error
        if (error.response) {
            // The request was made and the server responded with a status code
            // that falls out of the range of 2xx
            console.error('Error response data:', error.response.data);
            console.error('Error response status:', error.response.status);
            console.error('Error response headers:', error.response.headers);
        } else if (error.request) {
            // The request was made but no response was received
            console.error('Error request data:', error.request);
        } else {
            // Something happened in setting up the request that triggered an Error
            console.error('Error message:', error.message);
        }
        return null; // Optionally return null or an appropriate value to handle the error in the calling code
    }
};

const subscribeToEmail = async (email, url) => {
    try {
        const response = await fetch(url + '/api/user/subscribe', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ email }),
        });

        const data = response.json();

        return data;
    } catch (error) {
        return 'Error occurred while subscribing.' + error
    }
}

export { registerUser, subscribeToEmail }
