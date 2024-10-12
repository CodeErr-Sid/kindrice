const generateOrderID = () => {
    // Generate a random number between 100000 and 999999
    const orderID = Math.floor(100000 + crypto.getRandomValues(new Uint32Array(1))[0] % 900000);
    return orderID.toString();
};

const formatOrderDate = () => {
    const now = new Date();
  
    const year = now.getFullYear();
    const month = String(now.getMonth() + 1).padStart(2, '0'); // Months are 0-indexed
    const day = String(now.getDate()).padStart(2, '0');
    const hours = String(now.getHours()).padStart(2, '0');
    const minutes = String(now.getMinutes()).padStart(2, '0');
  
    // Combine into the desired format: YYYY-MM-DD HH:MM
    return `${year}-${month}-${day} ${hours}:${minutes}`;
  };
  
  



export { generateOrderID, formatOrderDate }
