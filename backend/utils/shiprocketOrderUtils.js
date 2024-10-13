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

const getNextBusinessDay = () => {
  const date = new Date(); // Use today's date
  const dayOfWeek = date.getDay(); // Get the day of the week (0 = Sunday, 1 = Monday, ..., 5 = Friday, 6 = Saturday)

  if (dayOfWeek === 5) {
    // If today is Friday, skip to Monday by adding 3 days
    date.setDate(date.getDate() + 3);
  } else {
    // Otherwise, just add 1 day
    date.setDate(date.getDate() + 1);
  }

  // Format the date in YYYY-MM-DD format
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0'); // Months are 0-based
  const day = String(date.getDate()).padStart(2, '0');

  return `${year}-${month}-${day}`;
}



export { generateOrderID, formatOrderDate, getNextBusinessDay }
