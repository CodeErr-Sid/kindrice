import React, { useState } from 'react';
import axios from 'axios';

function LocationFetcher() {
  const [pinCode, setPinCode] = useState('');
  const [location, setLocation] = useState({ city: '', state: '' });
  const [error, setError] = useState('');

  const fetchLocation = async (pin) => {
    try {
      const response = await axios.get(`https://api.postalpincode.in/pincode/${pin}`);

      console.log(response);
      // Check if the API response is valid and contains the expected data
      if (response && response.data && response.data[0].Status === 'Success') {
        const postOfficeData = response.data[0].PostOffice[0];
        setLocation({
          city: postOfficeData.Name,
          state: postOfficeData.State,
        });
        setError('');
      } else {
        setError('Invalid Pin Code or data not found');
        setLocation({ city: '', state: '' });
      }
    } catch (err) {
      setError('Failed to fetch location');
      setLocation({ city: '', state: '' });
    }
  };

  const handlePinCodeChange = (e) => {
    const newPin = e.target.value;
    setPinCode(newPin);

    // Only fetch location if the pin code has 6 digits
    if (newPin.length === 6) {
      fetchLocation(newPin);
    }
  };

  return (
    <div>
      <h3>Enter Pin Code</h3>
      <input
        type="text"
        value={pinCode}
        onChange={handlePinCodeChange}
        placeholder="Enter 6-digit pin code"
        maxLength="6"
      />
      {error && <p style={{ color: 'red' }}>{error}</p>}
      {location.city && location.state && (
        <p>City: {location.city}, State: {location.state}</p>
      )}
    </div>
  );
}

export default LocationFetcher;
